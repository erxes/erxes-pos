/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useApp } from 'modules/AppContext';
import LottieView from 'ui/Lottie';
import { formatNum, getSumsOfAmount } from 'modules/utils';
import cn from 'classnames';
import Button from 'ui/Button';
import { useUI } from 'ui/context';
import { useCheckoutContext } from '../context';
import { useConfigsContext } from 'modules/auth/containers/Configs';

const PaymentReport = () => {
  const { paymentTypes } = useConfigsContext();
  const { openModal, setModalView } = useUI();
  const { orderDetail } = useApp();
  const { totalAmount, cashAmount, number, paidAmounts, mobileAmount } =
    orderDetail || {};
  const { remainder, oddMoney } = useCheckoutContext();

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
          {!!mobileAmount && (
            <h6 className="flex-h-between description-item">
              <span>Цахимаар</span>
              <b>{formatNum(mobileAmount)}₮</b>
            </h6>
          )}
          {Object.values(getSumsOfAmount(paidAmounts, paymentTypes)).map(
            (i: any) => (
              <h6 className="flex-h-between description-item" key={i.title}>
                <span>{i.title}</span>
                <b>{formatNum(i.value)}₮</b>
              </h6>
            )
          )}
          <h6 className="flex-h-between description-item">
            <span>Үлдэгдэл дүн</span>
            <b>{formatNum(remainder)}₮</b>
          </h6>
          {!!oddMoney && <h6 className="flex-h-between description-item">
            <span>Хариулт дүн</span>
            <b>{formatNum(oddMoney)}₮</b>
          </h6>}
        </div>
        <Button onClick={handleClick} disabled={!paid}>
          <big>Баримт хэвлэх</big>
        </Button>
      </div>
    </div>
  );
};

export default PaymentReport;
