import { useRouter } from 'next/router';
import { useApp } from 'modules/AppContext';
import { useCheckoutContext } from 'modules/checkout/context';
import LottieView from 'modules/common/ui/Lottie';
import { getMode } from 'modules/utils';
import { useUI } from 'modules/common/ui/context';
import { toast } from 'react-toastify';
import useAddPayment from 'lib/useAddPayment';
import { useEffect } from 'react';
import useTDB from './useTDB';

function TDB() {
  const router = useRouter();
  const { orderId } = router.query;
  const { orderDetail } = useApp();
  const { totalAmount } = orderDetail;
  const { amounts } = useCheckoutContext();
  const {TDB_CARD, endPoint, objToString, method, headers} = useTDB()
  const tdbCard = amounts[TDB_CARD] || 0;
  const mode = getMode();
  const { closeModal, setModalView } = useUI();

  const onCompleted = () => {
    if (mode === 'kiosk') {
      return setModalView('SUCCESS_VIEW');
    }
    if (mode === 'pos') {
      return closeModal();
    }
  };
  const { addPayment } = useAddPayment(onCompleted);

  const handleError = (msg: string) => {
    mode === 'kiosk' ? setModalView('PAYMENT_VIEW') : closeModal();
    toast.dismiss();
    toast.error(msg);
  };
  

  const sendTransaction = async () => {
    fetch(endPoint, {
      method,
      headers,
      body: objToString({
        operation: 'Sale',
        ecrRefNo: orderId,
        amount: mode === 'kiosk' ? totalAmount.toString() : tdbCard.toString(),
      }),
    })
      .then((res) => res.json())
      .then((res: any) => {
        if (res && res.ecrResult && res.ecrResult.RespCode === '00') {
          toast.success('Transaction was successful');
          addPayment({
            _id: orderId,
            paidAmounts: [
              {
                _id: Math.random().toString(),
                amount: parseFloat(mode === 'kiosk' ? totalAmount : tdbCard),
                type: TDB_CARD,
                info: res.ecrResult,
              },
            ],
          });
        } else {
          handleError('Unexpected error');
        }
      })
      .catch((e) => handleError(e.message));
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
}

export default TDB;
