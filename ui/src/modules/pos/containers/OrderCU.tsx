import { useApp } from 'modules/AppContext';
import useIsDisabled from 'lib/useIsDisabled';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAddQuery } from 'lib/useQuery';
import { formatNum, goToReceipt, setLocal } from 'modules/utils';
import Input from 'ui/Input';
import useOrderCU from 'lib/useOrderCU';
import useTotalValue from 'lib/useTotalValue';
import Button from 'ui/Button';
import Deliver from '../../checkout/components/Deliver';
import useIsEditable from 'lib/useIsEditable';
import { ORDER_TYPES } from 'modules/constants';
import OrderFinish from './OrderFinish';

const OrderCU = () => {
  const { type, orderDetail, description, setDescription } = useApp();
  const [buttonType, setButtonType] = useState('');
  const { paidDate } = useIsEditable();
  const { addQuery } = useAddQuery();
  const router = useRouter();
  const total = useTotalValue();
  const disabled = useIsDisabled();

  const onCompleted = (_id: string) => {
    if (buttonType === 'pay') {
      setLocal('cart', []);
      return router.push(`/checkout/${_id}`);
    }

    if (buttonType === 'finish') {
      setLocal('cart', []);
    }

    return addQuery({ orderId: _id });
  };

  const { loading, orderCU } = useOrderCU(onCompleted);

  const handleClick = (val: string) => {
    setButtonType(val);
    orderCU();
  };

  if (paidDate) {
    return (
      <div className="checkout-controls">
        <Button className="pay" onClick={() => goToReceipt(orderDetail._id)}>
          Баримт хэвлэх
        </Button>
      </div>
    );
  }

  return (
    <div className="checkout-controls">
      {[...ORDER_TYPES.OUT, 'delivery'].includes(type) && (
        <Input
          placeholder={type === 'delivery' ? 'Хүргэлтийн мэдээлэл' : 'Mэдээлэл'}
          value={description}
          onChange={(val: string) => setDescription(val)}
        />
      )}
      <div className="row">
        <div className="col-6">
          <Deliver />
        </div>
        <div className="col-6">
          <Button
            className="order"
            disabled={disabled || ORDER_TYPES.OUT.includes(type)}
            onClick={() => handleClick('order')}
            loading={buttonType === 'order' && loading}
          >
            Захиалах
          </Button>
        </div>
      </div>
      {ORDER_TYPES.SALES.includes(type) ? (
        <Button
          className="pay"
          disabled={!total}
          onClick={() => handleClick('pay')}
          loading={buttonType === 'pay' && loading}
        >
          Төлбөр төлөх {total ? formatNum(total) + '₮' : ''}
        </Button>
      ) : (
        <OrderFinish onCompleted={onCompleted}/>
      )}
    </div>
  );
};

export default OrderCU;
