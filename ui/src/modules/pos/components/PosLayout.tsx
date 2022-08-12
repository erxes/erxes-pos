import PosHeader from './PosHeader';
import CustomerSearch from 'modules/customer/components/Search';
import SlotChoose from 'modules/slots/components/SlotChoose';
import OrderPos from 'modules/order/components/pos';

type Props = {
  children: any;
};

function PosLayout({ children }: Props) {
  return (
    <>
      <PosHeader />
      <main className="pos-container">
        {children}
        <div className="pos-sidebar">
          <CustomerSearch />
          <SlotChoose />
          <OrderPos />
        </div>
      </main>
    </>
  );
}

export default PosLayout;
