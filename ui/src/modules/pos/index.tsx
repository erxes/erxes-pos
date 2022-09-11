import Products from 'modules/products/containers/Products';
import Categories from 'modules/products/containers/Categories';
import Search from 'modules/products/components/Search';

const Pos = () => {
  return (
    <div className="pos-content">
      <div className="flex-v-center flex-0 products-header">
        <Search />
        <div className="flex-1">
          <Categories />
        </div>
      </div>
      <Products />
    </div>
  );
};

export default Pos;
