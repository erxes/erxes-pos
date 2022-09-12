import PosHeader from './PosHeader';
import CustomerSearch from 'modules/customer/components/Search';
import SlotChoose from 'modules/slots/components/SlotChoose';
import Cart from 'modules/checkout/containers/Cart';
import OrderCUContainer from 'modules/checkout/containers/OrderCUContainer';
import OrderCU from './OrderCU';

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
          <OrderCUContainer OrderCU={OrderCU} />
        </div>
      </main>
    </>
  );
}

export default PosLayout;
