import PosHeader from './PosHeader';
import CustomerSearch from 'modules/customer/components/Search';
import SlotChoose from 'modules/slots/components/SlotChoose';
import Cart from 'modules/checkout/containers/Cart';
import OrderCreateEdit from 'modules/checkout/containers/OrderCreateEdit';

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
          <OrderCreateEdit />
        </div>
      </main>
    </>
  );
}

export default PosLayout;
