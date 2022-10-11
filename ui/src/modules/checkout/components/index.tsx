import PaymentControls from './PaymentControls';
import PaymentReport from './PaymentReport';

const Checkout = () => {
  return (
    <div className="checkout row">
      <PaymentControls />
      <PaymentReport />
    </div>
  );
};

export default Checkout;
