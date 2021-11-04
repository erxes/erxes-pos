import orders from './orders';
import products from './products';
import users from './users';
import configs from './configs';

export default {
  ...orders,
  ...products,
  ...users,
  ...configs
};
