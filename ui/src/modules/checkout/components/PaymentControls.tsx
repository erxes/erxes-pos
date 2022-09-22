import PaymentMethods from '../containers/PaymentMethods';
import KeyBoard from './KeyBoard';
import Button from 'ui/Button';
import Qr from 'icons/Qr';
import { useUI } from 'ui/context';
import { useApp } from 'modules/AppContext';

const PaymentControls = () => {
  const { openModal, setModalView } = useUI();
  const { orderDetail } = useApp();

  const { qpayInvoices } = orderDetail;

  const handleClick = () => {
    setModalView('QPAY_LIST_VIEW');
    openModal();
  };

  return (
    <div className="col payment-controls">
      <div className="flex-v-center -header">
        <h6>Төлбөрийн нөхцөлөө сонгоно уу.</h6>
        {qpayInvoices && qpayInvoices.length ? (
          <Button variant="slim" onClick={handleClick}>
            <Qr />
          </Button>
        ) : null}
      </div>
      <PaymentMethods />
      <KeyBoard />
    </div>
  );
};

export default PaymentControls;
