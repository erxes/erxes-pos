import { useCheckoutContext } from 'modules/checkout/context';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import Visa from 'icons/Visa';
import PaymentInput from 'modules/checkout/components/PaymentInput';
import Button from 'ui/Button';

const Card = ({ setType }: any) => {
  const { activePayment, changeActivePayment, remainder, setCardValue, card } =
    useCheckoutContext();

  if (activePayment === '') {
    const handleClick = () => {
      changeActivePayment('card');
      setCardValue(remainder);
    };
    return (
      <PaymentMethod onClick={handleClick}>
        <Visa />
      </PaymentMethod>
    );
  }

  if (activePayment === 'card')
    return (
      <PaymentInput
        onClick={() => changeActivePayment('')}
        setValue={setCardValue}
        value={card}
      >
        <Button>Гүйлгээ хийх</Button>
      </PaymentInput>
    );

  return null;
};

export default Card;
