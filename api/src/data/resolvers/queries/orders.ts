import { Orders } from '../../../db/models/Orders';

const orderQueries = {
  orders() {
    return Orders.find().lean();
  }
};

export default orderQueries;
