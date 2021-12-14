import Customers from "../../db/models/Customers";
import { IOrderDocument } from "../../db/models/definitions/orders";
import { OrderItems } from "../../db/models/OrderItems";
import { PutResponses } from "../../db/models/PutResponses";
import { QPayInvoices } from "../../db/models/QPayInvoices";
import Users from "../../db/models/Users";

export default {
  items(order: IOrderDocument) {
    return OrderItems.find({ orderId: order._id }).lean();
  },
  customer(order: IOrderDocument) {
    return Customers.findOne({ _id: order.customerId || '' });
  },
  user(order: IOrderDocument) {
    return Users.findOne({ _id: order.userId });
  },
  putResponses(order: IOrderDocument) {
    return PutResponses.find({ contentId: order._id }).sort({ createdAt: -1 }).lean()
  },
  qpayInvoice(order: IOrderDocument) {
    return QPayInvoices.findOne({ senderInvoiceNo: order._id }).lean()
  }
};
