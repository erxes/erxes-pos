import orders from './orders';
import users from './users';
import configs from './configs';
import payments from './payments';

export default {
  ...orders,
  ...users,
  ...configs,
  ...payments
};
