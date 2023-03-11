import { useCheckoutContext } from 'modules/checkout/context';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import CashIcon from 'modules/common/icons/🤑';
import useAddPayment from 'lib/useAddPayment';
import { PAYMENT_TYPES } from 'modules/constants';

const Cash = () => {
  const { amounts, remainder, setOddMoney, setValue } = useCheckoutContext();

  const { addPayment, loading } = useAddPayment(() => setValue(0, PAYMENT_TYPES.CASH));

  const handleClick = () => {
    if (amounts[PAYMENT_TYPES.CASH] > remainder) {
      setOddMoney(amounts[PAYMENT_TYPES.CASH] - remainder);
      return addPayment({
        cashAmount: remainder,
      });
    }
    return addPayment({
      cashAmount: amounts[PAYMENT_TYPES.CASH],
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
