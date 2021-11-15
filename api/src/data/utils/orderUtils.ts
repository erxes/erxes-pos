import * as dayjs from 'dayjs';
import { IOrder } from '../../db/models/definitions/orders';

import { Orders } from '../../db/models/Orders';
import { IPayment } from '../resolvers/mutations/orders';

export const generateOrderNumber = async (): Promise<string> => {
  const today = dayjs().hour(0).minute(0).second(0);
  const tomorrow = today.add(1, 'day');

  const orderCountToday = await Orders.countDocuments({
    createdAt: { $gte: today.toDate(), $lt: tomorrow.toDate() },
  });

  const dateString = today.format('YYYYMMDD').toString();
  const number = String(orderCountToday + 1).padStart(4, '0');

  return `${dateString}_${number}`;
};

export const validateOrderPayment = (order: IOrder, doc: IPayment) => {
  const { cardAmount = 0, cashAmount = 0, mobileAmount = 0 } = doc;

  const total = cardAmount + cashAmount + mobileAmount;

  if (total !== order.totalAmount) {
    throw new Error(`Paid amount does not match order's total amount`);
  }
};
