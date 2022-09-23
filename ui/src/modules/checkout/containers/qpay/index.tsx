import { useRouter } from 'next/router';
import { useMutation, gql } from '@apollo/client';
import { useCheckoutContext } from 'modules/checkout/context';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import { mutations, queries } from '../../graphql';
import Image from 'modules/common/ui/Image';
import { getMode } from 'modules/utils';
import { useUI } from 'modules/common/ui/context';
import { toast } from 'react-toastify';

const Qpay = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const mode = getMode();
  const { qpay } = useCheckoutContext();
  const { setModalView, openModal } = useUI();

  const [createInvoice, { loading }] = useMutation(
    gql(mutations.createQpaySimpleInvoice),
    {
      variables: {
        amount: qpay,
        orderId,
      },
      onError(error) {
        toast.error(error.message);
      },
      onCompleted(data) {
        router.push(
          {
            pathname: router.pathname,
            query: {
              ...router.query,
              qpayId: data.poscCreateQpaySimpleInvoice._id,
            },
          },
          undefined,
          { shallow: true }
        );
        setModalView('QPAY_VIEW');
        openModal();
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
