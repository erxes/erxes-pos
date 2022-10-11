import CartItem from './CartItem';
import Scroll from './Scroll';
import { useApp } from 'modules/AppContext';
import Empty from 'ui/Empty';
import type { ICartItem } from 'modules/types';
import OrderCU from './OrderCU';

const Cart = () => {
  const { cart } = useApp();

  return (
    <div className="kiosk-cart">
      <h3>
        Миний <br />
        захиалга
      </h3>
      <div className="kiosk-cart-items">
        {cart && cart.length ? (
          <Scroll>
            {cart.map((item: ICartItem) => (
              <CartItem key={item._id} {...item} />
            ))}
          </Scroll>
        ) : (
          <Empty />
        )}
      </div>
      <OrderCU />
    </div>
  );
};

export default Cart;
