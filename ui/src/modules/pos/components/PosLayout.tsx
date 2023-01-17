import PosHeader from './PosHeader';
import CustomerSearch from 'modules/customer/containers/Search';
import SlotChoose from 'modules/slots/containers/SlotChoose';
import Cart from 'modules/checkout/containers/Cart';
import OrderCU from '../containers/OrderCU';
import KeyListener from './KeyListener';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// const;

function PosLayout({ children }: Props) {
  return (
    <KeyListener className="flex flex-col h-100vh">
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
    </KeyListener>
  );
}

export default PosLayout;
