import orders from './orders';
import products from './products';
import users from './users';
import configs from './configs';
import customers from './customers';
import payments from './payments';

export default {
  ...orders,
  ...products,
  ...users,
  ...configs,
  ...customers,
  ...payments
};
