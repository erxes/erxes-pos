import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import OrderDetailContainer from 'modules/checkout/containers/OrderDetailContainer';
import CheckMode, { checkLayoutMode } from 'modules/CheckMode';

const Checkout = dynamic(() => import('modules/checkout/components'), {
  suspense: true,
});

const KioskCheckout = dynamic(
  () => import('modules/kiosk/components/Checkout'),
  {
    suspense: true,
  }
);

const Payment = () => {
  const router = useRouter();
  return (
    // <CheckoutContextProvider>
    <OrderDetailContainer id={router.query.orderId}>
      <CheckMode pos={<Checkout />} kiosk={<KioskCheckout />} />
    </OrderDetailContainer>
    // </CheckoutContextProvider>
  );
};

const BlackLayout = dynamic(() => import('ui/BlackLayout'));

const MainLayout = dynamic(() => import('modules/common/Layout'), {
  suspense: true,
});

Payment.Layout = checkLayoutMode(BlackLayout, MainLayout);

export default Payment;
