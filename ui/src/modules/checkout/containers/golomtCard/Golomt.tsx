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
import { getMode, objToBase64 } from 'modules/utils';
import { GOLOMT_CARD } from '.';

const Card = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const { orderDetail } = useApp();
  const { totalAmount } = orderDetail;
  const { amounts } = useCheckoutContext();
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

  const PATH = 'http://localhost:8500';

  const data = {
    portNo: '4',
    requestID: orderId,
    terminalID: '13152634',
    operationCode: '1',
    bandwidth: '115200',
    timeout: '540000',
    currencyCode: '496',
    cMode: '',
    cMode2: '',
    additionalData: '',
    cardEntryMode: '',
    fileData: '',
  };

  const handleError = (msg: string) => {
    mode === 'kiosk' ? setModalView('PAYMENT_VIEW') : closeModal();
    toast.dismiss();
    toast.error(msg);
  };

  const sendTransaction = async () => {

          fetch(
            `${PATH}/requestToPos/message?data=${objToBase64({
              ...data,
              amount:
                ((mode === 'kiosk'
                  ? totalAmount
                  : golomtCard) * 100).toString(),
            })}`
          )
            .then((res) => res.json())
            .then((r) => {
              const posResult = JSON.parse(r?.PosResult)
              if (posResult?.responseCode === '00') {
                  toast.success('Transaction was successful');
                  addPayment({
                    _id: orderId,
                    paidAmounts: [
                      {
                        _id: Math.random().toString(),
                        amount: parseFloat(
                          mode === 'kiosk' ? totalAmount : golomtCard
                        ),
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
        }


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
