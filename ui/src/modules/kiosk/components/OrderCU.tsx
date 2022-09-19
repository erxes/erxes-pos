import { useRouter } from 'next/router';
import { useUI } from 'ui/context';
import useTotalValue from 'lib/useTotalValue';
import useOrderCU from 'lib/useOrderCU';
import Button from 'ui/Button';
import { formatNum } from '../../utils';

const OrderCU = () => {
  const router = useRouter();
  const { closeSidebar } = useUI();

  const onCompleted = (_id: string) => {
    closeSidebar();
    router.push({
      pathname: '/checkout/[orderId]',
      query: { orderId: _id },
    });
  };

  const { orderCU, loading } = useOrderCU(onCompleted);

  const totalValue = useTotalValue();

  return (
    <div className="kiosk-cart-footer text-center">
      <h6>Нийт дүн</h6>
      <h3>{formatNum(totalValue)}₮</h3>

      <Button
        Component="h4"
        onClick={() => orderCU()}
        disabled={!totalValue}
        loading={loading}
      >
        Төлөх
      </Button>
    </div>
  );
};

export default OrderCU;
