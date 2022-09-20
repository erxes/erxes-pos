import { useUI } from 'ui/context';
import { useApp } from 'modules/AppContext';
import LottieView from 'ui/Lottie';
import Button from 'ui/Button';
import { formatNum } from 'modules/utils';

const PaymentReport = () => {
  const { openModal } = useUI();
  const { orderDetail } = useApp();
  const { totalAmount, cashAmount, cardAmount, mobileAmount } =
    orderDetail || {};

  const remainder = totalAmount - (cardAmount + cashAmount + mobileAmount);
  return (
    <div className="col flex-center payment-report">
      <div className="white-tab text-center">
        <div className="payment-report-check">
          <LottieView path="/complete.json" />
        </div>
        <h2>{formatNum(totalAmount)}₮</h2>
        <h5>Нийт төлөх</h5>
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
        <Button onClick={openModal}>
          <big>Баримт хэвлэх</big>
        </Button>
      </div>
    </div>
  );
};

export default PaymentReport;
