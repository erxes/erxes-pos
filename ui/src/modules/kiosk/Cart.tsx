import { useState } from 'react';
import Button from 'modules/common/ui/Button';
import Icon from 'modules/common/icons/Cart';
import Sidebar from 'modules/common/ui/SideBar';
import CartItem from './CartItem';
import Scroll from './Scroll';
import Link from 'next/link';

const Cart = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <div className="kiosk-cart-btn">
        <Button onClick={() => setShowSidebar(true)}>
          <Icon />
          <h6 className="badge flex-center">33</h6>
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
              <Scroll>
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
              </Scroll>
            </div>
            <div className="kiosk-cart-footer text-center">
              <h6>Нийт дүн</h6>
              <h3>40 500₮</h3>
              <Link href="/kiosk/review">
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
