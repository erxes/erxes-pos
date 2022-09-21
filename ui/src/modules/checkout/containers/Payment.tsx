import PaymentMethods from './PaymentMethods';

const Payment = () => {
  return (
    <div className="modal-kiosk -payment">
      <h2>
        Төлбөрийн хэрэгсэлээ
        <br /> сонгоно уу
      </h2>
      <PaymentMethods />
    </div>
  );
};

export default Payment;
