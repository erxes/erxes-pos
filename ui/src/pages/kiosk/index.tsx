import Header from 'modules/kiosk/header';
import CategoriesContainer from 'modules/products/containers/Categories';
import ProductsContainer from 'modules/products/containers/Products';
import Cart from 'modules/kiosk/cart';

const Kiosk = () => {
  return (
    <div className="kiosk flex">
      <Header />
      <div className="kiosk-categories">
        <CategoriesContainer />
      </div>
      <div className="kiosk-products">
        <ProductsContainer />
      </div>
      <Cart />
    </div>
  );
};

export default Kiosk;
