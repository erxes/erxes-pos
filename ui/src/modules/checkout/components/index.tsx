import PaymentControls from './PaymentControls';
import PaymentReport from './PaymentReport';
import { CheckoutContextProvider } from '../context';

const Checkout = () => {
  return (
    <CheckoutContextProvider>
      <div className="checkout row">
        <PaymentControls />
        <PaymentReport />
      </div>
    </CheckoutContextProvider>
  );
};

export default Checkout;
