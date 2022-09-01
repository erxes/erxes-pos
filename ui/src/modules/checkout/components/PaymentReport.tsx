import { useUI } from 'ui/context';
import Button from 'ui/Button';

const PaymentReport = () => {
  const { openModal } = useUI();
  return (
    <div className="col flex-center payment-report">
      <div className="white-tab text-center">
        <h2>13500₮</h2>
        <h5>Нийт төлөх</h5>
        <div className="description">
          <h6 className="flex-v-center description-item">
            <span>Бэлнээр</span>
            <b>120 000₮</b>
          </h6>
          <h6 className="flex-v-center description-item">
            <span>Картаар</span>
            <b>50 000₮</b>
          </h6>
          <h6 className="flex-v-center description-item">
            <span>Qpay</span>
            <b>30 000₮</b>
          </h6>
          <h6 className="flex-v-center description-item">
            <span>Хөнгөлөлт</span>
            <b>0%</b>
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
