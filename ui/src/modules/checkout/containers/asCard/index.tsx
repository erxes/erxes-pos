import { useCheckoutContext } from 'modules/checkout/context';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import useAddPayment from 'lib/useAddPayment';

const Cash = () => {
  const { asCard } = useCheckoutContext();

  const { addPayment, loading } = useAddPayment();

  const handleClick = () => {
    addPayment({
      cardAmount: asCard,
    });
  };

  return (
    <PaymentMethod
      name="asCard"
      onClick={handleClick}
      btnText="Kaртаар тооцох"
      loading={loading}
    >
      &nbsp;&nbsp;<h6>Kaртаар тооцох</h6>
    </PaymentMethod>
  );
};

export default Cash;
