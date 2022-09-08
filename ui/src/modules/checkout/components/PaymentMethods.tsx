import PaymentMethod from './PaymentMethod';
import Card from '../containers/card';
import Cash from 'icons/🤑';
import Image from 'next/future/image';

const PaymentMethods = () => {
  return (
    <div className="row payment-methods">
      {/* <PaymentMethod>
        <h6>
          <Cash />
          Бэлнээр
        </h6>
      </PaymentMethod> */}
      <Card />
      {/* <PaymentMethod>
        <div className="img-wrap">
          <Image src="/qpay.png" alt="" fill quality={100} />
        </div>
      </PaymentMethod> */}
    </div>
  );
};

export default PaymentMethods;
