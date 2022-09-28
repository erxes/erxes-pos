import { useEffect } from 'react';

const Waiting = ({ subscribeToOrderStatuses, orders }: any) => {
  useEffect(() => {
    subscribeToOrderStatuses();
  }, []);

  return (
    <div className="row">
      {orders.map((order: any) => (
        <h1 key={order._id}>{order.number.split('_')[1]}</h1>
      ))}
    </div>
  );
};

export default Waiting;
