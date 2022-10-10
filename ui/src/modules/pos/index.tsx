import Products from 'modules/products/containers/Products';
import Categories from 'modules/products/containers/Categories';
import PosLayout from './components/PosLayout';
import Search from 'ui/Search';

const Pos = () => {
  const onSearch = (val: string) => {};

  return (
    <PosLayout>
      <div className="pos-content">
        <div className="flex-v-center flex-0 products-header">
          <Search closeable onSearch={onSearch} />
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
