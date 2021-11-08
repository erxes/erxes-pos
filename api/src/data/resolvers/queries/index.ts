import orders from './orders';
import products from './products';
import users from './users';
import configs from './configs';
import customers from './customers';

export default {
  ...orders,
  ...products,
  ...users,
  ...configs,
  ...customers
};
