import useAddPayment from 'lib/useAddPayment';
import useAmounts from 'lib/useAmounts';
import { useApp } from 'modules/AppContext';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import { useCheckoutContext } from 'modules/checkout/context';
import type { PaymentType } from 'modules/types';
// import { toast } from 'react-toastify';

const Payment = ({ type, title, icon, config }: PaymentType) => {
  const { amounts } = useCheckoutContext();
  const amount = amounts[type] || 0;
  const { addPayment, loading } = useAddPayment();
  const { orderDetail } = useApp();
  const { customerId } = orderDetail || {};
  const { cashAmount, mobileAmount, paidAmounts, checkNotSplitIncluded } =
    useAmounts();

  const { mustCustomer, notSplit } = config || ({} as any);

  if ((mustCustomer && !customerId) || (!notSplit && checkNotSplitIncluded()))
    return null;

  const checkHide = () => {
    if (cashAmount || mobileAmount) return true;

    for (let index = 0; index < paidAmounts?.length; index++) {
      const element = paidAmounts[index];
      if (element?.type !== type) return true;
    }
    return false;
  };

  if (notSplit && checkHide()) return null;

  const handleClick = () => {
    addPayment({
      paidAmounts: [{ _id: Math.random().toString(), amount, type }],
    });
  };

  return (
    <PaymentMethod
      name={type}
      onClick={handleClick}
      btnText={title}
      loading={loading}
      disabled={notSplit}
    >
      <span className="flex-v-center">
        <h4 className={`icon-${icon}`}></h4>
        <h6>{title}</h6>
      </span>
    </PaymentMethod>
  );
};

export default Payment;
