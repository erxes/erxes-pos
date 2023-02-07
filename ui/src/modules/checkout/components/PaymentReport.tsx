/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useApp } from 'modules/AppContext';
import LottieView from 'ui/Lottie';
import { formatNum, sumAmount } from 'modules/utils';
import cn from 'classnames';
import Button from 'ui/Button';
import { useUI } from 'ui/context';
import { useCheckoutContext } from '../context';

const PaymentReport = () => {
  const { openModal, setModalView } = useUI();
  const { orderDetail } = useApp();
  const { totalAmount, cashAmount, number, paidAmounts } = orderDetail || {};
  const { remainder } = useCheckoutContext();

  const filterByType = (type: string) =>
    sumAmount(paidAmounts.filter((i: any) => i.type === type));

  const paid = remainder === 0;

  const handleClick = () => {
    setModalView('EBARIMT_VIEW');
    openModal();
  };

  useEffect(() => {
    if (totalAmount) {
      paid && handleClick();
    }
  }, [remainder]);

  return (
    <div className="col flex-center payment-report">
      <div className="white-tab text-center">
        <h5>Захиалын дугаар: {(number || '').split('_')[1]}</h5>

        {paid && (
          <div className="payment-report-check">
            <LottieView path="/complete.json" />
          </div>
        )}
        <h2>{formatNum(totalAmount)}₮</h2>
        <h5 className={cn({ '-pb': !paid })}>Нийт төлөх</h5>
        <div className="description">
          {!!cashAmount && (
            <h6 className="flex-h-between description-item">
              <span>Бэлнээр</span>
              <b>{formatNum(cashAmount)}₮</b>
            </h6>
          )}
          {!!filterByType('receivableAmount') && (
            <h6 className="flex-h-between description-item">
              <span>Дараа</span>
              <b>{formatNum(filterByType('receivableAmount'))}₮</b>
            </h6>
          )}
          {!!filterByType('cardAmount') && (
            <h6 className="flex-h-between description-item">
              <span>Картаар</span>
              <b>{formatNum(filterByType('cardAmount'))}₮</b>
            </h6>
          )}
          {!!filterByType('mobileAmount') && (
            <h6 className="flex-h-between description-item">
              <span>Цахимаар</span>
              <b>{formatNum(filterByType('mobileAmount'))}₮</b>
            </h6>
          )}
          <h6 className="flex-h-between description-item">
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
