import { useUI } from 'ui/context';
import useSettlePayment from 'lib/useSettlePayment';
import Button from 'ui/Button';

const PrintEBarimt = () => {
  const { closeModal } = useUI();

  const showReciept = () => {
    closeModal();
    window.location.href = '/';
  };

  const onCompleted = () => {
    return showReciept();
  };

  const { settlePayment, loading } = useSettlePayment(onCompleted);

  return (
    <Button loading={loading} className="print" onClick={() => settlePayment()}>
      Хэвлэх
    </Button>
  );
};

export default PrintEBarimt;
