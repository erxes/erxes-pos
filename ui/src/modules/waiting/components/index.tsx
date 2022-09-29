import { useEffect } from 'react';

const Waiting = ({
  subToOrderStatuses,
  orders,
  subToItems,
  ordersConfirm,
  orderItems,
}: any) => {
  useEffect(() => {
    subToOrderStatuses();
    subToItems();
  }, []);

  let partialOrders: any = [];

  orderItems.forEach((item: any) => {
    const temp = ordersConfirm.find((order: any) => order._id === item.orderId);
    temp && partialOrders.push(temp);
  });

  const all = [...orders, ...partialOrders];
  console.log(all);

  const setOrders = [...new Map(all.map((m) => [(m || {})._id, m])).values()];

  return (
    <div className="row">
      {setOrders.map((order: any) => (
        <h1 key={(order || {})._id}>
          {((order || {}).number || '_0').split('_')[1]}
        </h1>
      ))}
    </div>
  );
};

export default Waiting;
