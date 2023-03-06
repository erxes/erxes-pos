import useAddPayment from 'lib/useAddPayment';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import { useCheckoutContext } from 'modules/checkout/context';
import type { PaymentType } from 'modules/types';

const Payment = ({ type, title, icon }: PaymentType) => {
  const { amounts } = useCheckoutContext();
  const amount = amounts[type] || 0;
  const { addPayment, loading } = useAddPayment();

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
    >
      <h6 className="flex-v-center">
        <h4 className={`icon-${icon}`}></h4>
        <span>{title}</span>
      </h6>
    </PaymentMethod>
  );
};

export default Payment;
