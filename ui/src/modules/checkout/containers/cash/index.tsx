import { useCheckoutContext } from 'modules/checkout/context';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import CashIcon from 'modules/common/icons/🤑';
import useAddPayment from 'lib/useAddPayment';

const Cash = () => {
  const { amounts } = useCheckoutContext();

  const { addPayment, loading } = useAddPayment();

  const handleClick = () => {
    addPayment({
      cashAmount: amounts['cashAmount'] || 0,
    });
  };

  return (
    <PaymentMethod
      name="cashAmount"
      onClick={handleClick}
      btnText="Төлөх"
      loading={loading}
    >
      <CashIcon className="-cash" />
      &nbsp;&nbsp;<h6>Бэлнээр</h6>
    </PaymentMethod>
  );
};

export default Cash;
