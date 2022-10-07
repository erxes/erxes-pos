import { useEffect } from 'react';
import { useApp } from 'modules/AppContext';
import useSettlePayment from 'lib/useSettlePayment';
import Button from 'ui/Button';

const Success = () => {
  const { orderDetail } = useApp();

  const onCompleted = () => {};

  const { settlePayment, loading } = useSettlePayment(onCompleted);

  useEffect(() => {
    settlePayment();
  }, []);

  return (
    <div className="kiosk-success text-center">
      <h3>
        Таны захиалгын
        <br /> дугаар
      </h3>
      <h1>{orderDetail.number.split('_')[1]}</h1>
      <b>худалдаж авах хэсэгрүү очно уу.</b>
      <Button onClick={() => (window.location.href = '/')}>
        <big>Дахин захиалах</big>
      </Button>
    </div>
  );
};

export default Success;
