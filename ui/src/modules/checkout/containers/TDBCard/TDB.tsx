import { useRouter } from 'next/router';
import { TDB_CARD, objToString } from '.';
import { useApp } from 'modules/AppContext';
import { useCheckoutContext } from 'modules/checkout/context';
import LottieView from 'modules/common/ui/Lottie';
import { getMode } from 'modules/utils';
import { useUI } from 'modules/common/ui/context';
import { toast } from 'react-toastify';
import useAddPayment from 'lib/useAddPayment';
import { useEffect } from 'react';

function TDB() {
  const router = useRouter();
  const { orderId } = router.query;
  const { orderDetail } = useApp();
  const { totalAmount } = orderDetail;
  const { amounts } = useCheckoutContext();
  const tdbCard = amounts[TDB_CARD] || 0;
  const mode = getMode();
  const { closeModal, setModalView } = useUI();
  const PATH = 'http://localhost:8088';

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
    fetch(`${PATH}/ecrt1000`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
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
