import * as dayjs from 'dayjs';

import { Orders } from '../../db/models/Orders';

export const generateOrderNumber = async (): Promise<string> => {
  const today = dayjs().hour(0).minute(0).second(0);
  const tomorrow = today.add(1, 'day');

  const orderCountToday = await Orders.countDocuments({
    createdAt: { $gte: today.toDate(), $lt: tomorrow.toDate() },
  });

  return String(orderCountToday + 1).padStart(4, '0');
};
