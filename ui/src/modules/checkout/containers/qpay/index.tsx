import { useRouter } from 'next/router';
import useTotalValue from 'lib/useTotalValue';
import { useMutation, gql } from '@apollo/client';
import { mutations } from '../../graphql';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import Image from 'next/future/image';
import QRCode from 'react-qr-code';
import Loading from 'modules/common/ui/Loading';

const Qpay = ({ setType, type }: any) => {
  const router = useRouter();
  const { orderId } = router.query;
  const amount = useTotalValue();

  const [createInvoice, { loading, data, error }] = useMutation(
    gql(mutations.createQpaySimpleInvoice),
    {
      variables: {
        amount,
        orderId,
      },
      onError(data) {
        console.log(data);
      },
    }
  );

  const handleClick = () => {
    setType('qpay');
    createInvoice();
  };

  const invoice = (data || {}).poscCreateQpaySimpleInvoice;

  if (type === 'qpay') {
    return (
      <>
        <h3>Qrcode</h3>
        {error && <h5 className="error">{error.message}</h5>}
        {invoice && <QRCode value={invoice && invoice.qrText} size={300} />}
      </>
    );
  }

  return (
    <PaymentMethod onClick={handleClick} loading={loading}>
      <div className="img-wrap">
        <Image src="/qpay.png" alt="" fill quality={100} />
      </div>
    </PaymentMethod>
  );
};

export default Qpay;
