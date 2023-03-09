import PaymentMethods from '../containers/PaymentMethods';
import KeyBoard from './KeyBoard';

const PaymentControls = () => {
  return (
    <div className="col payment-controls">
      <div className="flex-v-center -header">
        <h6>Төлбөрийн нөхцөлөө сонгоно уу.</h6>
      </div>
      <PaymentMethods />
      <KeyBoard />
    </div>
  );
};

export default PaymentControls;
