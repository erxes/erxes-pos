import { useRouter } from 'next/router';
import { useMutation, gql } from '@apollo/client';
import { useCheckoutContext } from 'modules/checkout/context';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import { mutations } from '../../graphql';
import Image from 'modules/common/ui/Image';

const Qpay = () => {
  const router = useRouter();
  const { orderId } = router.query;

  const { qpay } = useCheckoutContext();

  const [createInvoice, { loading, data, error }] = useMutation(
    gql(mutations.createQpaySimpleInvoice),
    {
      variables: {
        amount: qpay,
        orderId,
      },
      onError(data) {
        console.log(data);
      },
    }
  );

  return (
    <PaymentMethod
      name="qpay"
      onClick={() => createInvoice()}
      loading={loading}
      btnText="Нэхэмжлэл үүсгэх"
    >
      <div className="img-wrap">
        <Image src="/qpay.png" alt="" fill quality={100} />
      </div>
    </PaymentMethod>
  );
};

export default Qpay;
