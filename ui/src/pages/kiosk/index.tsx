import Header from 'modules/kiosk/Header';
import CategoriesContainer from 'modules/products/containers/Categories';
import ProductsContainer from 'modules/products/containers/Products';
import Cart from 'modules/kiosk/Cart';
import Scroll from 'modules/kiosk/Scroll';
import MainLayout from 'modules/common/Layout';

const Kiosk = () => {
  return (
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
      <footer></footer>
      <Cart />
    </div>
  );
};

Kiosk.Layout = MainLayout;

export default Kiosk;
