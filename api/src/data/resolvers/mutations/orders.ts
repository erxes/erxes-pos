import { Orders } from '../../../db/models/Orders';
import { OrderItems } from '../../../db/models/OrderItems';
import { IOrderInput } from '../../types';
import { generateOrderNumber } from '../../utils/orderUtils';
import { IContext } from '../../types';

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
      userId: user._id
    });

    for (const item of items) {
      await OrderItems.createOrderItem({ ...item, orderId: order._id });
    }

    return order;
  }
};

export default orderMutations;
