import { useRouter } from 'next/router';
import { useMutation, gql } from '@apollo/client';
import { useCheckoutContext } from 'modules/checkout/context';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import { mutations, queries } from '../../graphql';
import Image from 'modules/common/ui/Image';
import { getMode } from 'modules/utils';
import { useUI } from 'modules/common/ui/context';

const Qpay = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const mode = getMode();
  const { qpay } = useCheckoutContext();
  const { setModalView } = useUI();

  const [createInvoice, { loading }] = useMutation(
    gql(mutations.createQpaySimpleInvoice),
    {
      variables: {
        amount: qpay,
        orderId,
      },
      onError(data) {
        console.log(data);
      },
      onCompleted(data) {
        if (mode === 'kiosk') {
          router.push({
            pathname: router.pathname,
            query: {
              ...router.query,
              qpayId: data.createQpaySimpleInvoice._id,
            },
          });
          setModalView('QPAY_VIEW');
        }
      },
      refetchQueries: [{ query: gql(queries.orderDetail) }, 'orderDetail'],
    }
  );

  return (
    <PaymentMethod
      name="qpay"
      onClick={() => createInvoice()}
      loading={loading}
      btnText="Нэхэмжлэл үүсгэх"
    >
      {/* <div className="img-wrap"> */}
      <Image src="/qpay.png" alt="" fill quality={100} />
      {/* </div> */}
    </PaymentMethod>
  );
};

export default Qpay;
