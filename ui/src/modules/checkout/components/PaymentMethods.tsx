import PaymentMethod from './PaymentMethod';
import Cash from 'icons/🤑';
import Visa from 'icons/Visa';
import Image from 'next/future/image';

const PaymentMethods = () => {
  return (
    <div className="row payment-methods">
      <PaymentMethod>
        <h6>
          <Cash />
          Бэлнээр
        </h6>
      </PaymentMethod>
      <PaymentMethod>
        <Visa />
      </PaymentMethod>
      <PaymentMethod>
        <div className="img-wrap">
          <Image src="/qpay.png" alt="" fill quality={100} />
        </div>
      </PaymentMethod>
    </div>
  );
};

export default PaymentMethods;
