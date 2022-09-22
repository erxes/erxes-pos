import { useRouter } from 'next/router';
import { useApp } from 'modules/AppContext';
import QRCode from 'react-qr-code';
import Empty from 'ui/Empty';
import CheckPayment from '../containers/qpay/checkPayment';
import CancelPayment from '../containers/qpay/cancelPayment';
import Tag from 'ui/Tag';
import { formatNum } from 'modules/utils';

const QpayQr = () => {
  const router = useRouter();
  const { orderDetail } = useApp();

  const invoice = orderDetail.qpayInvoices.find(
    (inv: any) => inv._id === router.query.qpayId
  );

  if (!invoice)
    return (
      <div className="qpay">
        <Empty dark />
      </div>
    );

  return (
    <div className="qpay text-center">
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
        <Tag status={invoice.status}>{invoice.status}</Tag>
      </div>

      <div className="flex-center">
        <CheckPayment />
        <CancelPayment />
      </div>
    </div>
  );
};

export default QpayQr;
