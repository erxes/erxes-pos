/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCheckoutContext } from 'modules/checkout/context';
import { useApp } from 'modules/AppContext';
import { useUI } from 'ui/context';
import { useState } from 'react';
import useAddPayment from 'lib/useAddPayment';
import { toast } from 'react-toastify';
import LottieView from 'ui/Lottie';
import { getMode } from 'modules/utils';
import useGolomt from './useGolomt';

const Card = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const { orderDetail } = useApp();
  const { totalAmount } = orderDetail;
  const { amounts } = useCheckoutContext();
  const { sendData, endPoint, GOLOMT_CARD } = useGolomt();
  const golomtCard = amounts[GOLOMT_CARD] || 0;
  

  const onCompleted = () => {
    if (mode === 'kiosk') {
      return setModalView('SUCCESS_VIEW');
    }
    if (mode === 'pos') {
      return closeModal();
    }
  };

  const { addPayment } = useAddPayment(onCompleted);

  const [loading] = useState(true);
  const mode = getMode();
  const { closeModal, setModalView } = useUI();
  const handleError = (msg: string) => {
    mode === 'kiosk' ? setModalView('PAYMENT_VIEW') : closeModal();
    toast.dismiss();
    toast.error(msg);
  };

  const sendTransaction = async () => {
    fetch(
      endPoint({
        ...sendData,
        requestID: orderId,
        operationCode: '1',
        amount: (
          (mode === 'kiosk' ? totalAmount : golomtCard) * 100
        ).toString(),
      })
    )
      .then((res) => res.json())
      .then((r) => {
        const posResult = JSON.parse(r?.PosResult);
        if (posResult?.responseCode === '00') {
          toast.success('Transaction was successful');
          addPayment({
            _id: orderId,
            paidAmounts: [
              {
                _id: Math.random().toString(),
                amount: parseFloat(mode === 'kiosk' ? totalAmount : golomtCard),
                type: GOLOMT_CARD,
                info: decodeURIComponent(atob(posResult.responseDesc)),
              },
            ],
          });
        } else {
          handleError(r.responseDesc);
        }

        if (posResult?.responseCode && posResult.responseDesc) {
          handleError(`${posResult.responseDesc}`);
        }
      })
      .catch((e) => {
        handleError(e.message);
      });
  };

  useEffect(() => {
    sendTransaction();
  }, []);

  if (loading)
    return (
      <div className="card-loading">
        <h2 className="text-center">
          Та картаа <br /> уншуулна уу!
        </h2>
        <div className="img-wrap">
          <LottieView path="https://assets6.lottiefiles.com/packages/lf20_6yhhrbk6.json" />
        </div>
      </div>
    );

  return null;
};

export default Card;
