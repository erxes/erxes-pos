import { Products, ProductCategories } from '../../db/models/Products';
import { Configs } from '../../db/models/Configs';
import Users from '../../db/models/Users';
import Customers from '../../db/models/Customers';
import { IUserDocument } from '../../db/models/definitions/users';
import { ICustomerDocument } from '../../db/models/definitions/customers';
import { IConfig } from '../../db/models/definitions/configs';

export const importUsers = async (
  users: IUserDocument[],
  isAdmin: boolean = false
) => {
  for (const user of users) {
    await Users.createOrUpdateUser({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      isOwner: user.isOwner || isAdmin,
      isActive: user.isActive,
      details: user.details,
    });
  }
};

export const preImportProducts = async (groups: any = []) => {
  let importProductIds: string[] = [];
  const importProductCatIds: string[] = []
  const oldAllProducts = await Products.find({}, { _id: 1 }).lean();
  const oldProductIds = oldAllProducts.map(p => (p._id))
  const oldAllProductCats = await ProductCategories.find({}, { _id: 1 }).lean();
  const oldCategoryIds = oldAllProductCats.map(p => (p._id))

  for (const group of groups) {
    const categories = group.categories || [];

    for (const category of categories) {
      importProductCatIds.push(category._id);
      importProductIds = importProductIds.concat(category.products.map(p => (p._id)))
    }
  } // end group loop

  const removeProductIds = oldProductIds.filter(id => (!importProductIds.includes(id)));
  await Products.removeProducts(removeProductIds);

  const removeCategoryIds = oldCategoryIds.filter(id => (!importProductCatIds.includes(id)));
  for (const catId of removeCategoryIds) {
    await ProductCategories.removeProductCategory(catId);
  }
}

export const importProducts = async (groups: any = []) => {
  for (const group of groups) {
    const categories = group.categories || [];

    for (const category of categories) {
      await ProductCategories.updateOne({ _id: category._id }, { $set: { ...category, products: undefined } }, { upsert: true });

      let bulkOps: Array<{
        updateOne: {
          filter: { _id: string };
          update: any;
          upsert: true;
        };
      }> = [];

      for (const product of category.products) {
        bulkOps.push({
          updateOne: {
            filter: { _id: product._id },
            update: { $set: { ...product, sku: product.sku || 'ш' } },
            upsert: true
          }
        });
      }

      if (bulkOps.length) {
        await Products.bulkWrite(bulkOps);
      }
    }
  } // end group loop
};

export const preImportCustomers = async (customers) => {
  const importCustomerIds = customers.map(c => (c._id));

  const removeCustomers = await Customers.find({ _id: { $nin: importCustomerIds } }).lean();

  for (const customer of removeCustomers) {
    await Customers.removeCustomer(customer._id)
  }
}

export const importCustomers = async (customers: ICustomerDocument[]) => {
  let bulkOps: Array<{
    updateOne: {
      filter: { _id: string };
      update: any;
      upsert: true;
    };
  }> = [];

  let counter = 0;
  for (const customer of customers) {
    if (counter > 1000) {
      counter = 0;
      await Customers.bulkWrite(bulkOps);
      bulkOps = []
    }

    counter += 1;

    bulkOps.push({
      updateOne: {
        filter: { _id: customer._id },
        update: { $set: { ...customer } },
        upsert: true
      }
    });
  }

  if (bulkOps.length) {
    await Customers.bulkWrite(bulkOps);
  }
};

// Pos config created in main erxes differs from here
export const extractConfig = (doc) => {
  const { ERXES_API_DOMAIN } = process.env;
  const { uiOptions = { favIcon: '', logo: '', bgImage: '' } } = doc;

  const FILE_PATH = `${ERXES_API_DOMAIN}/read-file`;

  uiOptions.favIcon = !uiOptions.favIcon.includes('http')
    ? `${FILE_PATH}?key=${uiOptions.favIcon}`
    : uiOptions.favIcon;
  uiOptions.logo = !uiOptions.logo.includes('http')
    ? `${FILE_PATH}?key=${uiOptions.logo}`
    : uiOptions.logo;
  uiOptions.bgImage = !uiOptions.bgImage.includes('http')
    ? `${FILE_PATH}?key=${uiOptions.bgImage}`
    : uiOptions.bgImage;

  return {
    name: doc.name,
    description: doc.description,
    brandId: doc.brandId,
    productDetails: doc.productDetails,
    adminIds: doc.adminIds,
    cashierIds: doc.cashierIds,
    uiOptions,
    ebarimtConfig: doc.ebarimtConfig,
  }
};

export const validateConfig = (config: IConfig) => {
  const { adminIds = [], cashierIds = [], name } = config;

  if (!name) {
    throw new Error('POS name missing');
  }

  if (adminIds.length + cashierIds.length === 0) {
    throw new Error('Admin & cashier user list empty');
  }
};

// receive product data through message broker
export const receiveProduct = async (data) => {
  const { action = '', object = {}, updatedDocument = {} } = data;

  if (action === 'create') {
    return Products.createProduct(object);
  }

  const product = await Products.findOne({ _id: object._id });

  if (action === 'update' && product) {
    return Products.updateProduct(product._id, updatedDocument);
  }

  if (action === 'delete') {
    // check usage
    return Products.removeProducts([object._id])
  }
};

export const receiveProductCategory = async (data) => {
  const { action = '', object = {}, updatedDocument = {} } = data;

  if (action === 'create') {
    return ProductCategories.createProduct(object);
  }

  const category = await ProductCategories.findOne({ _id: object._id });

  if (action === 'update' && category) {
    return ProductCategories.updateProductCategory(
      category._id,
      updatedDocument
    );
  }

  if (action === 'delete') {
    await ProductCategories.removeProductCategory(category._id);
  }
};

export const receiveCustomer = async (data) => {
  const { action = '', object = {}, updatedDocument = {} } = data;

  if (action === 'create') {
    return Customers.createCustomer(object);
  }

  const customer = await Customers.findOne({ _id: object._id });

  if (action === 'update' && customer) {
    return Customers.updateCustomer(customer._id, updatedDocument);
  }

  if (action === 'delete') {
    return Customers.removeCustomer(customer._id);
  }
};

export const receiveUser = async (data) => {
  const { action = '', object = {}, updatedDocument = {} } = data;
  const userId =
    updatedDocument && updatedDocument._id ? updatedDocument._id : '';

  // user create logic will be implemented in pos config changes
  const user = await Users.findOne({ _id: userId });

  if (action === 'update' && user) {
    return Users.updateOne(
      { _id: userId },
      {
        $set: {
          username: updatedDocument.username,
          password: updatedDocument.password,
          isOwner: updatedDocument.isOwner,
          email: updatedDocument.email,
          isActive: updatedDocument.isActive,
          details: updatedDocument.details,
        },
      }
    );
  }

  if (action === 'delete' && object._id) {
    return Users.updateOne({ _id: object._id }, { $set: { isActive: false } });
  }
};

export const receivePosConfig = async (data) => {
  const {
    updatedDocument = {},
    action = '',
    adminUsers = [],
    cashierUsers = [],
  } = data;

  const config = await Configs.getConfig({ token: updatedDocument.token });

  if (action === 'update' && config) {
    const adminIds = updatedDocument.adminIds || [];
    const cashierIds = updatedDocument.cashierIds || [];

    await Configs.updateConfig(config._id, extractConfig(updatedDocument));

    // set not found users inactive
    await Users.updateMany(
      { _id: { $nin: [...adminIds, ...cashierIds] } },
      { $set: { isActive: false } }
    );

    await importUsers(adminUsers, true);
    await importUsers(cashierUsers, false);
  }
};
