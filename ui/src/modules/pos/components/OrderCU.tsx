import { useRouter } from 'next/router';
import { formatNum } from 'modules/utils';
import useTotalValue from 'lib/useTotalValue';
import Button from 'ui/Button';
import Deliver from '../../checkout/components/Deliver';

const OrderCU = ({
  ordersAdd,
  ordersEdit,
  loading,
  loadingEdit,
  setType,
  type,
}: any) => {
  const router = useRouter();
  const { selectedOrder } = router.query;
  const total = useTotalValue();

  const handleClick = (val: string) => {
    setType(val);
    return selectedOrder ? ordersEdit() : ordersAdd();
  };
  return (
    <div className="checkout-controls">
      <div className="row">
        <div className="col-6">
          <Deliver />
        </div>
        <div className="col-6">
          <Button
            className="order"
            disabled={!total}
            onClick={() => handleClick('order')}
            loading={type === 'order' && (loading || loadingEdit)}
          >
            Захиалах
          </Button>
        </div>
      </div>
      <Button
        className="pay"
        disabled={!total}
        onClick={() => handleClick('pay')}
        loading={type === 'pay' && (loading || loadingEdit)}
      >
        Төлбөр төлөх {total ? formatNum(total) + '₮' : ''}
      </Button>
    </div>
  );
};

export default OrderCU;
