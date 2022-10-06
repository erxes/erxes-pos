import PaymentMethods from '../../checkout/containers/PaymentMethods';
import BackButton from '../../checkout/components/BackButton';
import { useUI } from 'modules/common/ui/context';

const Payment = () => {
  const { setModalView } = useUI();

  return (
    <>
      <BackButton onClick={() => setModalView('EBARIMT_VIEW')} />
      <div className="modal-kiosk -payment">
        <h2>
          Төлбөрийн хэрэгсэлээ
          <br /> сонгоно уу
        </h2>
        <PaymentMethods />
      </div>
    </>
  );
};

export default Payment;
