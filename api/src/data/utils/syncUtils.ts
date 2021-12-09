import { Products, ProductCategories } from '../../db/models/Products';
import Users from '../../db/models/Users';
import Customers from '../../db/models/Customers';
import { IUserDocument } from '../../db/models/definitions/users';
import { ICustomerDocument } from '../../db/models/definitions/customers';
import { IConfig } from '../../db/models/definitions/configs';
import { PRODUCT_STATUSES } from '../../db/models/definitions/constants';

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

export const importProducts = async (groups: any = []) => {
  for (const group of groups) {
    const categories = group.categories || [];

    for (const category of categories) {
      await ProductCategories.createProductCategory(category);

      await Products.insertMany(category.products || []);
    }
  } // end group loop
};

export const importCustomers = async (customers: ICustomerDocument[]) => {
  for (const customer of customers) {
    await Customers.createCustomer(customer);
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
    const isUsed = await Products.isUsed(product._id);

    if (!isUsed) {
      await Products.deleteOne({ _id: product._id });
    } else {
      await Products.updateOne(
        { _id: product._id },
        { $set: { status: PRODUCT_STATUSES.DELETED } }
      );
    }
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
