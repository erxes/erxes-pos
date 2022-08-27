import PosHeader from './PosHeader';
import CustomerSearch from 'modules/customer/components/Search';
import SlotChoose from 'modules/slots/components/SlotChoose';
import Cart from 'modules/checkout/components/Cart';
import Modal from 'ui/Modal/index';

type Props = {
  children: any;
};

function PosLayout({ children }: Props) {
  return (
    <>
      <PosHeader />
      <Modal onClose={() => {}} />
      <main className="pos-container">
        {children}
        <div className="pos-sidebar">
          <CustomerSearch />
          <SlotChoose />
          <Cart />
        </div>
      </main>
    </>
  );
}

export default PosLayout;
