import PosHeader from './PosHeader';
import CustomerSearch from 'modules/customer/containers/Search';
import SlotChoose from 'modules/slots/containers/SlotChoose';
import Cart from 'modules/checkout/containers/Cart';
import OrderCU from '../containers/OrderCU';

type Props = {
  children: any;
};

// const;

function PosLayout({ children }: Props) {
  return (
    <div className="flex flex-col h-100vh">
      <PosHeader />
      <main className="pos-container flex-1">
        {children}
        <div className="pos-sidebar">
          <CustomerSearch />
          <SlotChoose />
          <Cart />
          <OrderCU />
        </div>
      </main>
    </div>
  );
}

export default PosLayout;
