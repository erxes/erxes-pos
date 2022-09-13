import { useRouter } from 'next/router';
import useTotalValue from 'lib/useTotalValue';
import OrderCUContainer from 'modules/checkout/containers/OrderCUContainer';
import Button from 'ui/Button';
import { formatNum } from '../utils';

const OrderAddButton = ({
  loading,
  loadingEdit,
  ordersAdd,
  ordersEdit,
}: any) => {
  const router = useRouter();
  const { orderId } = router.query;
  const totalValue = useTotalValue();

  const handleClick = () => (orderId ? ordersEdit() : ordersAdd());

  return (
    <div className="kiosk-cart-footer text-center">
      <h6>Нийт дүн</h6>
      <h3>{formatNum(totalValue)}₮</h3>

      <Button
        Component="h4"
        onClick={handleClick}
        disabled={!totalValue}
        loading={loading || loadingEdit}
      >
        Төлөх
      </Button>
    </div>
  );
};

const OrderCU = () => {
  const router = useRouter();

  const onCompleted = (_id: string) => {
    router.push({
      pathname: '/checkout/[orderId]',
      query: { orderId: _id },
    });
  };
  return (
    <OrderCUContainer OrderCU={OrderAddButton} onCompleted={onCompleted} />
  );
};

export default OrderCU;
