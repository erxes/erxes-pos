import { useApp } from 'modules/AppContext';
import { sumAmount } from 'modules/utils';

const useAmounts = () => {
  const { orderDetail } = useApp();
  const { totalAmount, paidAmounts, cashAmount, mobileAmount } =
    orderDetail || {};

  const paidAmount =
    sumAmount(paidAmounts || []) + (cashAmount || 0) + (mobileAmount || 0);

  const remainder = totalAmount - paidAmount;

  return { paidAmount, remainder };
};

export default useAmounts;
