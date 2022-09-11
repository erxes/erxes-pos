import { useState } from 'react';
import Button from 'modules/common/ui/Button';
import Icon from 'modules/common/icons/Cart';
import Sidebar from 'modules/common/ui/SideBar';
import CartItem from './CartItem';
import Scroll from './Scroll';
import Link from 'next/link';
import { useApp } from 'modules/AppContext';
import Empty from 'ui/Empty';
import type { ICartItem } from 'modules/types';
import useTotalValue from 'lib/useTotalValue';
import { formatNum } from '../utils';

const Cart = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { cart } = useApp();
  const totalValue = useTotalValue(cart);
  return (
    <>
      <div className="kiosk-cart-btn">
        <Button onClick={() => setShowSidebar(true)}>
          <Icon />
          <h6 className="badge flex-center">{cart.length}</h6>
        </Button>
      </div>
      {showSidebar && (
        <Sidebar onClose={() => setShowSidebar(false)}>
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
            <div className="kiosk-cart-footer text-center">
              <h6>Нийт дүн</h6>
              <h3>{formatNum(totalValue)}₮</h3>
              <Link href="/review">
                <Button Component="h4">Төлөх</Button>
              </Link>
            </div>
          </div>
        </Sidebar>
      )}
    </>
  );
};

export default Cart;
