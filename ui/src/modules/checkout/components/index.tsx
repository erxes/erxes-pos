import PaymentControls from './PaymentControls';
import PaymentReport from './PaymentReport';

const Payment = () => {
  return (
    <div className="checkout row">
      <PaymentControls />
      <PaymentReport />
    </div>
  );
};

export default Payment;
