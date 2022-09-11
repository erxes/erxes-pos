import Header from './Header';
import CategoriesContainer from '../products/containers/Categories';
import ProductsContainer from '../products/containers/Products';
import Cart from './Cart';
import Scroll from './Scroll';

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
      <Cart />
    </div>
  );
};

export default Kiosk;
