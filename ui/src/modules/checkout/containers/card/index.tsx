import { useCheckoutContext } from 'modules/checkout/context';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import Visa from 'icons/Visa';
import PaymentInput from 'modules/checkout/components/PaymentInput';

const Card = () => {
  const { activePayment, changeActivePayment } = useCheckoutContext();
  if (activePayment === '')
    return (
      <PaymentMethod onClick={() => changeActivePayment('card')}>
        <Visa />
      </PaymentMethod>
    );

  if (activePayment === 'card')
    return (
      <PaymentInput onClick={() => changeActivePayment('')}></PaymentInput>
    );

  return null;
};

export default Card;
