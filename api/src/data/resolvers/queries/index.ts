import orders from './orders';
import products from './products';
import users from './users';

export default {
  ...orders,
  ...products,
  ...users
};
