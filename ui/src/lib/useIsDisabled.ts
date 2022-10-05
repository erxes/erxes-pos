import { useRouter } from 'next/router';
import { useApp } from 'modules/AppContext';
import useTotalValue from 'lib/useTotalValue';
import { ORDER_STATUSES } from 'modules/constants';

const useIsDisabled = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const { orderDetail } = useApp();
  const total = useTotalValue();

  if (!orderDetail) {
    return !total;
  }

  return ORDER_STATUSES.DISABLED.indexOf(orderDetail.status) > -1 || !total;
};

export default useIsDisabled;
