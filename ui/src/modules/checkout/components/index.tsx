import PaymentControls from './PaymentControls';
import PaymentReport from './PaymentReport';
import { CheckoutContextProvider } from '../context';

const Payment = () => {
  return (
    <div className="checkout row">
      <CheckoutContextProvider>
        <PaymentControls />
        <PaymentReport />
      </CheckoutContextProvider>
    </div>
  );
};

export default Payment;
