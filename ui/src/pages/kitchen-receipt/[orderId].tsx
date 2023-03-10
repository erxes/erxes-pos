import OrderDetailContainer from 'modules/checkout/containers/OrderDetailContainer';
import Receipt from 'modules/checkout/containers/KitchenReceipt';

const OrderReciept = () => {
  return (
    <OrderDetailContainer>
      <Receipt />
    </OrderDetailContainer>
  );
};

const Layout = ({ children }: any) => {
  return <main className="printDocument-layout">{children}</main>;
};

OrderReciept.Layout = Layout;

export default OrderReciept;
