import { Orders } from '../../../db/models/Orders';
import { OrderItems } from '../../../db/models/OrderItems';
import { IOrderInput } from '../../types';
import {
  generateOrderNumber,
  validateOrderPayment,
  validateOrder,
  updateOrderItems,
  getTotalAmount,
} from '../../utils/orderUtils';
import { IContext } from '../../types';

export interface IPayment {
  cardAmount?: number;
  cashAmount?: number;
  mobileAmount?: number;
  billType: string;
  registerNumber?: string;
}

export interface IPaymentParams {
  _id: string;
  doc: IPayment;
}

interface IOrderEditParams extends IOrderInput {
  _id: string;
}

const orderMutations = {
  async ordersAdd(_root, doc: IOrderInput, { user }: IContext) {
    const { items = [], totalAmount, type, customerId } = doc;

    await validateOrder(doc);

    const order = await Orders.createOrder({
      number: await generateOrderNumber(),
      totalAmount,
      type,
      customerId,
      userId: user._id,
    });

    for (const item of items) {
      await OrderItems.createOrderItem({ ...item, orderId: order._id });
    }

    return order;
  },
  async ordersEdit(_root, doc: IOrderEditParams) {
    await Orders.getOrder(doc._id);

    await validateOrder(doc);

    await updateOrderItems(doc._id, doc.items);

    const updatedOrder = await Orders.updateOrder(doc._id, {
      customerId: doc.customerId,
      type: doc.type,
      totalAmount: getTotalAmount(doc.items),
    });

    return updatedOrder;
  },
  async ordersMakePayment(_root, { _id, doc }: IPaymentParams) {
    const order = await Orders.getOrder(_id);

    await validateOrderPayment(order, doc);

    await Orders.updateOne(
      { _id: order._id },
      { $set: { ...doc, paidDate: new Date() } }
    );

    return Orders.findOne({ _id });
  },
};

export default orderMutations;
