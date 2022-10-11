import { useUI } from 'ui/context';
import { toast } from 'react-toastify';
import useCancelQpay from 'lib/useCancelQpay';
import { useRemoveQuery } from 'lib/useQuery';

import Button from 'ui/Button';

const CancelPayment = () => {
  const { closeModal } = useUI();
  const { removeQuery } = useRemoveQuery();

  const onCompleted = () => {
    closeModal();
    removeQuery('qpayId');
    toast.success('Aмжилттай цуцаллаа');
  };

  const { cancel, loading } = useCancelQpay(onCompleted);

  return (
    <Button variant="slim" onClick={() => cancel()} loading={loading}>
      Цуцлах
    </Button>
  );
};

export default CancelPayment;
