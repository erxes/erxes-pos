import { useCheckoutContext } from 'modules/checkout/context';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import useAddPayment from 'lib/useAddPayment';

const Recievable = () => {
  const { receivable } = useCheckoutContext();
  const { addPayment, loading } = useAddPayment();

  const handleClick = () => {
    addPayment({
      receivableAmount: receivable,
    });
  };

  return (
    <PaymentMethod
      name="receivable"
      onClick={handleClick}
      btnText="Тооцох"
      loading={loading}
    >
      {/* <CashIcon /> */}
      &nbsp;&nbsp;<h6>Дараах</h6>
    </PaymentMethod>
  );
};

export default Recievable;
