import { Orders } from '../../../db/models/Orders';
import { OrderItems } from '../../../db/models/OrderItems';
import { IOrderInput } from '../../types';
import * as dayjs from 'dayjs';

const orderMutations = {
  async ordersAdd(_root, doc: IOrderInput) {
    const { items, totalAmount, type } = doc;
    const now = dayjs().format('YYYYMMDD').toString();
    const order = await Orders.createOrder({
      number: `${now}-${Math.random().toString()}`,
      totalAmount,
      type
    });

    for (const item of items) {
      await OrderItems.createOrderItem(item);
    }

    return order;
  }
};

export default orderMutations;
