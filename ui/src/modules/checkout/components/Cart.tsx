import { useApp } from 'modules/AppContext';
import CheckoutTotal from './Total';
import CheckoutItem from './Item';
import Empty from 'modules/common/ui/Empty';
import { ICartItem } from 'modules/types';

const CheckoutCart = () => {
  const { cart } = useApp();
  return (
    <>
      <CheckoutTotal />
      <div className="checkout-cart custom-scrollbar">
        {cart && cart.length ? (
          cart.map((item: ICartItem) => (
            <CheckoutItem key={item._id} {...item} />
          ))
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};

export default CheckoutCart;
