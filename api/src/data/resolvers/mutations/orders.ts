import { Orders } from '../../../db/models/Orders';
import { OrderItems } from '../../../db/models/OrderItems';
import { IOrderInput } from '../../types';
import { generateOrderNumber, validateOrderPayment } from '../../utils/orderUtils';
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

const orderMutations = {
  async ordersAdd(_root, doc: IOrderInput, { user }: IContext) {
    const { items = [], totalAmount, type, customerId } = doc;

    if (items.length < 1) {
      throw new Error('Products missing in order. Please add products');
    }

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
