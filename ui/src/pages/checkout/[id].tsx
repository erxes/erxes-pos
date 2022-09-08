import BlackLayout from 'ui/BlackLayout';
import { CheckoutContextProvider } from 'modules/checkout/context';
import PaymentContainer from 'modules/checkout/containers/PaymentContainer';

const Payment = () => {
  return (
    <CheckoutContextProvider>
      <PaymentContainer />
    </CheckoutContextProvider>
  );
};

Payment.Layout = BlackLayout;

export default Payment;
