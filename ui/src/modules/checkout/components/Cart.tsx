import { useApp } from 'modules/AppContext';
import CheckoutTotal from './Total';
import CheckoutItem from './Item';
import Empty from 'ui/Empty';
import { ICartItem } from 'modules/types';
import Scroll from 'modules/kiosk/components/Scroll';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const CheckoutCart = () => {
  const { cart, type } = useApp();
  const [animationParent] = useAutoAnimate<HTMLDivElement>();
  return (
    <>
      <CheckoutTotal />
      <div className="checkout-cart">
        {cart && !!cart.length ? (
          <Scroll>
            <div ref={animationParent}>
              {cart.map((item: ICartItem) => (
                <CheckoutItem key={item._id} {...item} type={type} />
              ))}
            </div>
          </Scroll>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};

export default CheckoutCart;
