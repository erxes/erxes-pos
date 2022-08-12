import type { NextPage } from 'next';
import PosLayout from 'modules/pos/components/PosLayout';
import Products from 'modules/products/components/Products';
import Categories from 'modules/products/components/Categories';
import Search from 'modules/products/components/Search';

const Home: NextPage = () => {
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

(Home as any).Layout = PosLayout;

export default Home;
