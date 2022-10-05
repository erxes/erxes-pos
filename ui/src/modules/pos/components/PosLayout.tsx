import PosHeader from './PosHeader';
import CustomerSearch from 'modules/customer/containers/Search';
import SlotChoose from 'modules/slots/components/SlotChoose';
import Cart from 'modules/checkout/containers/Cart';
import OrderCU from '../containers/OrderCU';

type Props = {
  children: any;
};

// const;

function PosLayout({ children }: Props) {
  return (
    <>
      <PosHeader />
      <main className="pos-container">
        {children}
        <div className="pos-sidebar">
          <CustomerSearch />
          <SlotChoose />
          <Cart />
          <OrderCU />
        </div>
      </main>
    </>
  );
}

export default PosLayout;
