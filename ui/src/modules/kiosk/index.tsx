import Header from './Header';
import CategoriesContainer from '../products/containers/Categories';
import ProductsContainer from '../products/containers/Products';
import Cart from './Cart';
import Scroll from './Scroll';
import { useApp } from 'modules/AppContext';
import Welcome from './welcome';

const Kiosk = () => {
  const { isTake } = useApp();

  if (!isTake || isTake === '') return <Welcome />;

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
