import { useState } from 'react';
import Card from './card';
import Qpay from './qpay';

const Payment = () => {
  const [type, setType] = useState('');

  return (
    <div className="modal-kiosk -payment">
      {type === '' && (
        <h2>
          Төлбөрийн хэрэгсэлээ
          <br /> сонгоно уу
        </h2>
      )}
      <div className="payment-methods -kiosk">
        {type !== 'qpay' && <Card setType={setType} type={type} />}
        {type !== 'card' && <Qpay setType={setType} type={type} />}
      </div>
    </div>
  );
};

export default Payment;
