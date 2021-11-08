import { Orders } from '../../../db/models/Orders';
import { OrderItems } from '../../../db/models/OrderItems';
import { IOrderInput } from '../../types';
import * as dayjs from 'dayjs';

const orderMutations = {
  async ordersAdd(_root, doc: IOrderInput) {
    const { items = [], totalAmount, type, customerId } = doc;

    if (items.length < 1) {
      throw new Error('Products missing in order. Please add products');
    }

    const now = dayjs().format('YYYYMMDD').toString();
    const order = await Orders.createOrder({
      number: `${now}-${Math.random().toString()}`,
      totalAmount,
      type,
      customerId
    });

    for (const item of items) {
      await OrderItems.createOrderItem(item);
    }

    return order;
  }
};

export default orderMutations;
