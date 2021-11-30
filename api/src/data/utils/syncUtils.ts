import { Products, ProductCategories } from '../../db/models/Products';
import Users from '../../db/models/Users';
import Customers from '../../db/models/Customers';
import { IUserDocument } from '../../db/models/definitions/users';
import { ICustomerDocument } from '../../db/models/definitions/customers';
import { IConfig } from '../../db/models/definitions/configs';

export const importUsers = async (users: IUserDocument[], isAdmin: boolean = false) => {
  for (const user of users) {
    await Users.createOrUpdateUser({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      isOwner: user.isOwner || isAdmin,
      isActive: user.isActive,
      details: user.details
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
