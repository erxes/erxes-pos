import { useApp } from 'modules/AppContext';
import LottieView from 'ui/Lottie';
import { formatNum } from 'modules/utils';
import cn from 'classnames';
import Button from 'ui/Button';
import { useUI } from 'ui/context';

const PaymentReport = () => {
  const { openModal, setModalView } = useUI();
  const { orderDetail } = useApp();
  const { totalAmount, cashAmount, cardAmount, mobileAmount, status } =
    orderDetail || {};

  const remainder = totalAmount - (cardAmount + cashAmount + mobileAmount);

  console.log(remainder);

  const paid = remainder === 0;

  const handleClick = () => {
    setModalView('EBARIMT_VIEW');
    openModal();
  };

  return (
    <div className="col flex-center payment-report">
      <div className="white-tab text-center">
        {paid && (
          <div className="payment-report-check">
            <LottieView path="/complete.json" />
          </div>
        )}
        <h2>{formatNum(totalAmount)}₮</h2>
        <h5 className={cn({ '-pb': !paid })}>Нийт төлөх</h5>
        <div className="description">
          <h6 className="flex-v-center description-item">
            <span>Бэлнээр</span>
            <b>{formatNum(cashAmount)}₮</b>
          </h6>
          <h6 className="flex-v-center description-item">
            <span>Картаар</span>
            <b>{formatNum(cardAmount)}₮</b>
          </h6>
          <h6 className="flex-v-center description-item">
            <span>Qpay</span>
            <b>{formatNum(mobileAmount)}₮</b>
          </h6>
          <h6 className="flex-v-center description-item">
            <span>Үлдэгдэл дүн</span>
            <b>{formatNum(remainder)}₮</b>
          </h6>
        </div>
        <Button onClick={handleClick} disabled={!paid}>
          <big>Баримт хэвлэх</big>
        </Button>
      </div>
    </div>
  );
};

export default PaymentReport;
