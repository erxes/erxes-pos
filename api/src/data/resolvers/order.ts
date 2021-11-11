import Customers from "../../db/models/Customers";
import { IOrderDocument } from "../../db/models/definitions/orders";
import { OrderItems } from "../../db/models/OrderItems";

export default {
  items(order: IOrderDocument) {
    return OrderItems.find({ orderId: order._id }).lean();
  },
  customer(order: IOrderDocument) {
    return Customers.findOne({ _id: order.customerId || '' });
  }
};
