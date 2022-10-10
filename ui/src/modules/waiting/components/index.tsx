import { useEffect } from 'react';
import { ORDER_STATUSES, ORDER_ITEM_STATUSES } from 'modules/constants';
import OrderItem from './OrderItem';

const Waiting = ({ subToOrderStatuses, orders, subToItems }: any) => {
  const { DONE, DOING, COMPLETE, REDOING } = ORDER_STATUSES;
  useEffect(() => {
    subToOrderStatuses([DOING, DONE, COMPLETE, REDOING]);
    subToItems([ORDER_ITEM_STATUSES.CONFIRM, DONE]);
  }, []);

  const updatedOrders = orders.filter(
    (order: any) =>
      order.items.every((item: any) => item.status === 'confirm') === false
  );

  return (
    <div className="row">
      {updatedOrders.map((order: any = {}) => (
        <OrderItem {...order} key={order._id} />
      ))}
    </div>
  );
};

export default Waiting;
