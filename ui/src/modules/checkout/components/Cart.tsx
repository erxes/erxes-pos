import { useApp } from 'modules/AppContext';
import CheckoutTotal from './Total';
import CheckoutItem from './Item';
import Empty from 'ui/Empty';
import { ICartItem } from 'modules/types';
import Scroll from 'modules/kiosk/components/Scroll';

const CheckoutCart = () => {
  const { cart, type } = useApp();
  return (
    <>
      <CheckoutTotal />
      <div className="checkout-cart">
        {cart && !!cart.length ? (
          <Scroll>
            {cart.map((item: ICartItem) => (
              <CheckoutItem key={item._id} {...item} type={type} />
            ))}
          </Scroll>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};

export default CheckoutCart;
