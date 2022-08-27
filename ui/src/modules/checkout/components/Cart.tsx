import CheckoutTotal from './Total';
import CheckoutItem from './Item';
import CheckoutControls from './Controls';
import Empty from 'ui/Empty';

const CheckoutCart = () => {
  return (
    <>
      <CheckoutTotal />
      <div className="checkout-cart custom-scrollbar">
        <Empty />
        {/* <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem /> */}
      </div>
      <CheckoutControls />
    </>
  );
};

export default CheckoutCart;
