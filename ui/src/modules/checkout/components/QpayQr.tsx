import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useApp } from 'modules/AppContext';
import { useUI } from 'ui/context';
import useCancelQpay from 'lib/useCancelQpay';
import QRCode from 'react-qr-code';
import { getMode } from 'modules/utils';
import Empty from 'ui/Empty';
import CheckPayment from '../containers/qpay/checkPayment';
import CancelPayment from '../containers/qpay/cancelPayment';
import Tag from 'ui/Tag';
import { formatNum } from 'modules/utils';
import LottieView from 'ui/Lottie';
import cn from 'classnames';
import BackButton from './BackButton';

const QpayQr = () => {
  const router = useRouter();
  const { orderDetail } = useApp();
  const { setModalView, closeModal } = useUI();

  const { cancel, loading } = useCancelQpay(() => setModalView('PAYMENT_VIEW'));
  const mode = getMode();
  const c = cn('qpay text-center', '-' + mode);

  const getInvoice = () => {
    const invoice = orderDetail.qpayInvoices.find(
      (inv: any) => inv._id === router.query.qpayId
    );
    return invoice;
  };
  const invoice = getInvoice();

  useEffect(() => {
    if (
      invoice &&
      invoice.qpayPaymentId &&
      invoice.paymentDate &&
      invoice.status === 'PAID'
    ) {
      mode === 'kiosk' && setModalView('SUCCESS_VIEW');
      mode === 'pos' && closeModal();
    }
  }, [invoice]);

  if (!invoice)
    return (
      <div className={c}>
        <Empty dark />
      </div>
    );

  if (invoice.status === 'PAID')
    return (
      <div className={c}>
        <div className="payment-report-check">
          <LottieView path="/complete.json" />
        </div>
      </div>
    );

  return (
    <>
      {mode === 'kiosk' && (
        <BackButton onClick={() => cancel()} disabled={loading} />
      )}
      <div className={c}>
        <p>
          <b>
            Та гар утасны аппликейшнаар доорх
            <br />
            QR кодыг уншуулна уу.
          </b>
        </p>
        {invoice && <QRCode value={invoice.qrText} className="qr" />}

        <div className="flex-center">
          <h6>{formatNum(invoice.amount)}₮</h6>
          <Tag status={invoice.status}>
            {invoice.status && mode === 'kiosk'
              ? 'Төлбөр хүлээгдэж буй'
              : invoice.status}
          </Tag>
        </div>

        <div className="flex-center">
          <CheckPayment />
          {mode === 'pos' && <CancelPayment />}
        </div>
      </div>
    </>
  );
};

export default QpayQr;
