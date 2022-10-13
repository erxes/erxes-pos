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

const Card = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const { orderDetail, billType } = useApp();
  const { number, totalAmount } = orderDetail;
  const { card } = useCheckoutContext();
  const { addPayment } = useAddPayment();

  const [loading, setLoading] = useState(true);
  const [cancelInterval, setCancelInterval] = useState(false);
  const mode = getMode();
  const { closeModal, setModalView } = useUI();

  const PATH = 'http://localhost:27028';

  const handleError = (msg: string) => {
    mode === 'kiosk' ? setModalView('PAYMENT_VIEW') : closeModal();
    toast.dismiss();
    toast.error(msg);
  };

  const sendTransaction = async () => {
    fetch(`${PATH}/ajax/get-status-info`)
      .then((res) => res.json())
      .then((res: any) => {
        if (res && res.status_code === 'ok') {
          // ! interval
          setCancelInterval(true);
          // send transaction upon successful connection
          fetch(PATH, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              service_name: 'doSaleTransaction',
              service_params: {
                // special character _ is not accepted
                db_ref_no: number.replace('_', ''),
                amount: mode === 'kiosk' ? totalAmount.toString() : card.toString(),
                vatps_bill_type: billType,
              },
            }),
          })
            .then((res) => res.json())
            .then((r) => {
              if (r && r.status === true && r.response) {
                if (r.response.response_code === '000') {
                  toast.success('Transaction was successful');

                  addPayment({
                    _id: orderId,
                    cardInfo: r.response,
                    cardAmount: mode === 'kiosk' ? totalAmount : card,
                  });

                  if (mode === 'kiosk') {
                    setModalView('SUCCESS_VIEW');
                  }
                  if (mode === 'pos') {
                    closeModal();
                  }
                } else {
                  handleError(r.response.response_msg);
                }
              }

              if (!r.status && r.response) {
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
          `${e.message}: Databank-н төлбөрийн програмтай холбогдсонгүй`
        );
      });

    //!!!!!!!!!!!!!!!!!!!!!!
    // setCancelInterval(true);
    // addPayment({
    //   _id: orderId,
    //   cardInfo: 'ok',
    //   cardAmount: mode === 'kiosk' ? totalAmount : card,
    // });

    // if (mode === 'kiosk') {
    //   setModalView('SUCCESS_VIEW');
    // }
    // if (mode === 'pos') {
    //   closeModal();
    // }
    // !
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
