import PaymentMethods from '../containers/PaymentMethods';
import KeyBoard from './KeyBoard';

const PaymentControls = () => {
  return (
    <div className="col payment-controls">
      <h6>Төлбөрийн нөхцөлөө сонгоно уу.</h6>
      <PaymentMethods />
      <KeyBoard />
    </div>
  );
};

export default PaymentControls;
