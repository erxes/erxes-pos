import Header from 'modules/common/Layout/Header';
import Orders from './containers/Orders';

const Kitchen = () => {
  return (
    <div className="kitchen h-100vh flex-col flex">
      <Header />
      <div className="flex-1">
        <Orders />
      </div>
    </div>
  );
};

export default Kitchen;
