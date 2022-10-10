import { useApp } from 'modules/AppContext';
import useIsDisabled from 'lib/useIsDisabled';
import { useRouter } from 'next/router';
import { formatNum, goToReceipt } from 'modules/utils';
import Input from 'ui/Input';
import useOrderCU from 'lib/useOrderCU';
import useTotalValue from 'lib/useTotalValue';
import Button from 'ui/Button';
import Deliver from '../../checkout/components/Deliver';
import useIsEditable from 'lib/useIsEditable';

const OrderCU = () => {
  const { setType, type, orderDetail, description, setDescription } = useApp();
  const { paidDate } = useIsEditable();
  const router = useRouter();
  const total = useTotalValue();
  const disabled = useIsDisabled();

  const onCompleted = (_id: string) => {
    if (type === 'pay') return router.push(`/checkout/${_id}`);
    return router.push({ pathname: '/', query: { orderId: _id } });
  };

  const { loading, orderCU } = useOrderCU(onCompleted);

  const handleClick = (val: string) => {
    setType(val);
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
      {type === 'delivery' && (
        <Input
          placeholder="Хүргэлтийн мэдээлэл"
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
            disabled={disabled}
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
