import { useApp } from 'modules/AppContext';
import useTotalValue from 'lib/useTotalValue';
import { ORDER_TYPES } from 'modules/constants';

const useIsDisabled = () => {
  const { orderDetail } = useApp();

  const total = useTotalValue();

  if (!orderDetail) {
    return !total;
  }

  if (ORDER_TYPES.OUT.includes(orderDetail.type || '')) {
    return !!orderDetail.paidDate;
  }

  return !!orderDetail.paidDate || !total;
};

export default useIsDisabled;
