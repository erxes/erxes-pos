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
    portNo: '7',
    requestID: '789',
    terminalID: '13152634',
    operationCode: '26',
    amount: '0',
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
    fetch(`${PATH}/requestToPos/message?data=${objToBase64(data)}`)
      .then((res) => res.json())
      .then((res: any) => {
        if (res.responseCode === '00') {
          // ! interval
          // send transaction upon successful connection
          fetch(
            `${PATH}/requestToPos/message?data=${objToBase64({
              ...data,
              operationCode: '1',
              amount:
                mode === 'kiosk'
                  ? totalAmount.toString()
                  : golomtCard.toString(),
            })}`
          )
            .then((res) => res.json())
            .then((r) => {
              if (r && r.data && r.responseDesc) {
                if (r.responseCode === '00') {
                  toast.success('Transaction was successful');
                  addPayment({
                    _id: orderId,
                    paidAmounts: [
                      {
                        _id: Math.random().toString(),
                        amount: parseFloat(
                          mode === 'kiosk' ? totalAmount : golomtCard
                        ),
                        type: 'cardAmount',
                        info: r.data,
                      },
                    ],
                  });
                } else {
                  handleError(r.responseDesc);
                }
              }

              if (!r.responseCode && r.data) {
                const { Exception = { ErrorMessage: '' } } = r.response;

                handleError(`${Exception.ErrorMessage}`);
              }
            })
            .catch((e) => {
              handleError(e.message);
            });
        }
      })
      .catch((e) => {
        handleError(
          `${e.message}: Голомт-н төлбөрийн програмтай холбогдсонгүй`
        );
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
