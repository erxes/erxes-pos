import { useApp } from 'modules/AppContext';
import { useUI } from 'ui/context';
import Button from 'ui/Button';

const OrderCU = ({ loading, orderAdd }: any) => {
  const { openModal } = useUI();
  const { cart } = useApp();

  return (
    <Button Component="h4" onClick={openModal}>
      Зөв байна
    </Button>
  );
};

export default OrderCU;
