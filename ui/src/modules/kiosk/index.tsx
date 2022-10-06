import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from './components/Header';
import CategoriesContainer from '../products/containers/Categories';
import ProductsContainer from '../products/containers/Products';
import Icon from 'modules/common/icons/Cart';
import Button from 'modules/common/ui/Button';
import Scroll from './components/Scroll';
import { useApp } from 'modules/AppContext';
import { useUI } from 'modules/common/ui/context';
import Welcome from './components/welcome';
import Layout from 'modules/common/Layout';
import Cart from 'modules/checkout/containers/Cart';

const Kiosk = () => {
  const router = useRouter();
  const { cart } = useApp();
  const [isTake, setIsTake] = useState(false);
  const { setSidebarView, openSidebar, setSidebarPlacement } = useUI();

  if (!router.query.orderId && !isTake)
    return <Welcome setIsTake={setIsTake} />;

  const handleOpenCart = () => {
    setSidebarView('CART_VIEW');
    setSidebarPlacement('LEFT');
    openSidebar();
  };

  return (
    <Layout>
      <div className="kiosk">
        <Header />
        <div className="kiosk-categories">
          <CategoriesContainer />
        </div>
        <div className="kiosk-products">
          <Scroll>
            <ProductsContainer />
          </Scroll>
        </div>
        <div className="kiosk-cart-btn">
          <Button onClick={handleOpenCart}>
            <Icon />
            <h6 className="badge flex-center">{cart.length}</h6>
          </Button>
        </div>
      </div>
      <Cart />
    </Layout>
  );
};

export default Kiosk;
