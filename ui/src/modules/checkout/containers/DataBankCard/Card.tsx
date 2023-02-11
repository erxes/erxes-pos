import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCheckoutContext } from 'modules/checkout/context';
import { useApp } from 'modules/AppContext';
import { useUI } from 'ui/context';
import useAddPayment from 'lib/useAddPayment';
import { toast } from 'react-toastify';
import LottieView from 'ui/Lottie';
import { getMode } from 'modules/utils';
import { DATA_BANK_CARD } from '.';

const Card = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const { orderDetail, billType } = useApp();
  const { number, totalAmount } = orderDetail;
  const { amounts } = useCheckoutContext();
  const card = amounts[DATA_BANK_CARD] || 0;
  const { closeModal, setModalView } = useUI();
  const mode = getMode();

  const onCompleted = () => {
    if (mode === 'kiosk') {
      return setModalView('SUCCESS_VIEW');
    }
    if (mode === 'pos') {
      return closeModal();
    }
  };

  const { addPayment } = useAddPayment(onCompleted);

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
                amount:
                  mode === 'kiosk' ? totalAmount.toString() : card.toString(),
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
                    paidAmounts: [
                      {
                        _id: Math.random().toString(),
                        amount: parseFloat(
                          mode === 'kiosk' ? totalAmount : card
                        ),
                        type: 'cardAmount',
                        info: r.response,
                      },
                    ],
                  });
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
  };

  useEffect(() => {
    sendTransaction();
  }, []);

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
};

export default Card;
