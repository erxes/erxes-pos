import Header from 'modules/common/Layout/Header';
import Orders from './containers/Orders';
import DoneOrders from './containers/DoneOrders';

const Kitchen = () => {
  return (
    <div className="kitchen h-100vh flex-col flex">
      <Header>
        <DoneOrders />
      </Header>
      <div className="flex-1 flex flex-col">
        <Orders />
      </div>
    </div>
  );
};

export default Kitchen;
