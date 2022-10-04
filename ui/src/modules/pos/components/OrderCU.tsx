import { useState } from 'react';
import { useApp } from 'modules/AppContext';
import { useRouter } from 'next/router';
import { formatNum } from 'modules/utils';
import { useRemoveQuery } from 'lib/useQuery';
import useOrderCU from 'lib/useOrderCU';
import useTotalValue from 'lib/useTotalValue';
import Button from 'ui/Button';
import Deliver from '../../checkout/components/Deliver';

const OrderCU = () => {
  const [type, setType] = useState('pay');
  const { removeQuery } = useRemoveQuery();

  const { setCart, orderDetail } = useApp();
  const router = useRouter();
  const total = useTotalValue();

  const onCompleted = (_id: string) => {
    if (type === 'pay') {
      return router.push(`/checkout/${_id}`);
    }
    setCart([]);
    if (type === 'order') {
      return removeQuery('selectedOrder');
    }
  };

  const { loading, orderCU } = useOrderCU(onCompleted);

  const handleClick = (val: string) => {
    if (
      val === 'pay' &&
      total === orderDetail.totalAmount &&
      router.query.orderId
    ) {
      return router.push(`/checkout/${router.query.orderId}`);
    }

    setType(val);
    orderCU();
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
            loading={type === 'order' && loading}
          >
            Захиалах
          </Button>
        </div>
      </div>
      <Button
        className="pay"
        disabled={!total}
        onClick={() => handleClick('pay')}
        loading={type === 'pay' && loading}
      >
        Төлбөр төлөх {total ? formatNum(total) + '₮' : ''}
      </Button>
    </div>
  );
};

export default OrderCU;
