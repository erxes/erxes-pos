import { useRouter } from 'next/router';
import { useState } from 'react';
import { useApp } from 'modules/AppContext';
import { removeQuery } from 'modules/utils';
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
  const router = useRouter();
  const [type, setType] = useState('pay');
  const { setCart } = useApp();

  const onCompleted = (_id: string) => {
    setCart([]);
    if (type === 'pay') {
      return router.push(`/checkout/${_id}`);
    }
    if (type === 'order') {
      return removeQuery(router, 'selectedOrder');
    }
  };

  const updatedProps = {
    OrderCU,
    onCompleted,
    type,
    setType,
  };

  return (
    <>
      <PosHeader />
      <main className="pos-container">
        {children}
        <div className="pos-sidebar">
          <CustomerSearch />
          <SlotChoose />
          <Cart />
          <OrderCUContainer {...updatedProps} />
        </div>
      </main>
    </>
  );
}

export default PosLayout;
