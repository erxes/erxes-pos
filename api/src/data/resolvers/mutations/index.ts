import orders from './orders';
import users from './users';
import configs from './configs';
import payments from './payments';
import customers from './customers';

export default {
  ...orders,
  ...users,
  ...configs,
  ...payments,
  ...customers
};
