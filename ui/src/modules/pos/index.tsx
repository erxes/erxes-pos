import Products from 'modules/products/containers/Products';
import Categories from 'modules/products/containers/Categories';
import PosLayout from './components/PosLayout';
import Search from 'modules/products/components/Search';

const Pos = () => {
  return (
    <PosLayout>
      <div className="pos-content">
        <div className="flex-v-center flex-0 products-header">
          <Search />
          <div className="flex-1">
            <Categories />
          </div>
        </div>
        <div className="flex-1">
          <Products />
        </div>
      </div>
    </PosLayout>
  );
};

export default Pos;
