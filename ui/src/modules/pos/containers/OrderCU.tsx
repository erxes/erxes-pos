import { useApp } from 'modules/AppContext';
import useIsDisabled from 'lib/useIsDisabled';
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
import { useEffect, useState } from 'react';

const OrderCU = () => {
  const {
    type,
    orderDetail,
    description,
    setDescription,
    dueDate,
    setDueDate,
    buttonType,
    setButtonType,
  } = useApp();
  const { paidDate } = useIsEditable();
  const { addQuery } = useAddQuery();
  const router = useRouter();
  const total = useTotalValue();
  const disabled = useIsDisabled();
  const [clicked, setClicked] = useState(false);

  const onCompleted = (_id: string) => {
    if (buttonType !== 'order') {
      setLocal('cart', []);
      return router.push(`/checkout/${_id}`);
    }

    return addQuery({ orderId: _id });
  };

  const { loading, orderCU } = useOrderCU(onCompleted);

  const handleClick = (val: string) => {
    setClicked(true);
    setButtonType(val);
  };

  useEffect(() => {
    if (clicked) {
      orderCU();
      setClicked(false);
    }
  }, [clicked, orderCU]);

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
      {[...ORDER_TYPES.OUT, ORDER_TYPES.DELIVERY, ORDER_TYPES.BEFORE].includes(
        type
      ) && (
        <Input
          placeholder={
            type === ORDER_TYPES.DELIVERY ? 'Хүргэлтийн мэдээлэл' : 'Mэдээлэл'
          }
          value={description}
          onChange={(val: string) => setDescription(val)}
        />
      )}
      {[ORDER_TYPES.BEFORE, ORDER_TYPES.DELIVERY].includes(type) && (
        <Input
          type="datetime-local"
          value={dueDate}
          onChange={(val) => setDueDate(val)}
        />
      )}
      <div className="row">
        <div className="col-6">
          <Deliver />
        </div>
        <div className="col-6">
          <Button
            className="order"
            disabled={ORDER_TYPES.OUT.includes(type) ? false : disabled}
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
        <OrderFinish />
      )}
    </div>
  );
};

export default OrderCU;
