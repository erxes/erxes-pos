import { Orders } from '../../../db/models/Orders';

const orderQueries = {
  orders() {
    return Orders.find().lean();
  },
  orderDetail(_root, { _id }) {
    return Orders.findOne({ _id });
  }
};

export default orderQueries;
