import type { NextPage } from 'next';
import PosLayout from 'modules/pos/components/PosLayout';
import Products from 'modules/products/components/Products';
import Categories from 'modules/products/components/Categories';

const Home: NextPage = () => {
  return (
    <div className="pos-content">
      <Categories />
      <Products />
    </div>
  );
};

(Home as any).Layout = PosLayout;

export default Home;
