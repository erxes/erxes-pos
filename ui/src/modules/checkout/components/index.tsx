import PaymentControls from './PaymentControls';
import PaymentReport from './PaymentReport';
import { CheckoutContextProvider } from '../context';

const Checkout = () => {
  return (
    <div className="checkout row">
      <PaymentControls />
      <PaymentReport />
    </div>
  );
};

export default Checkout;
