import { useEffect } from 'react';
import { ORDER_STATUSES } from 'modules/constants';
import OrderItem from './OrderItem';

const Waiting = ({ subToOrderStatuses, orders, subToItems }: any) => {
  const { DONE, DOING, CONFIRM, COMPLETE } = ORDER_STATUSES;
  useEffect(() => {
    subToOrderStatuses([DOING, DONE, COMPLETE]);
    subToItems([CONFIRM, DONE]);
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
