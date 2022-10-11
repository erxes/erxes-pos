import { useEffect } from 'react';
import { ORDER_STATUSES, ORDER_ITEM_STATUSES } from 'modules/constants';
import OrderItem from './OrderItem';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const Waiting = ({ subToOrderStatuses, orders, subToItems }: any) => {
  const { DONE, DOING, COMPLETE, REDOING } = ORDER_STATUSES;
  const [animationParent] = useAutoAnimate<HTMLDivElement>();

  useEffect(() => {
    subToOrderStatuses([DOING, DONE, COMPLETE, REDOING]);
    subToItems([ORDER_ITEM_STATUSES.CONFIRM, DONE]);
  }, []);

  const updatedOrders = orders.filter(
    (order: any) =>
      order.items.every((item: any) => item.status === 'confirm') === false
  );

  return (
    <div className="row" ref={animationParent}>
      {updatedOrders.map((order: any = {}) => (
        <OrderItem {...order} key={order._id} />
      ))}
    </div>
  );
};

export default Waiting;
