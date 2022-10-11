import { useRouter } from 'next/router';
import { useApp } from 'modules/AppContext';
import useTotalValue from 'lib/useTotalValue';

const useIsDisabled = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const { orderDetail } = useApp();
  const total = useTotalValue();

  if (!orderDetail) {
    return !total;
  }

  return !!orderDetail.paidDate || !total;
};

export default useIsDisabled;
