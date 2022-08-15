import OrderTotal from './Total';
import OrderItem from './Item';
import OrderControls from './Controls';

const OrderPos = () => {
  return (
    <>
      <OrderTotal />
      <div className="order-pos">
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
      </div>
      <OrderControls />
    </>
  );
};

export default OrderPos;
