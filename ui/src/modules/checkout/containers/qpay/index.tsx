import { useAddQuery } from 'lib/useQuery';
import { useMutation, gql } from '@apollo/client';
import { useCheckoutContext } from 'modules/checkout/context';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import { mutations, queries } from '../../graphql';
import Image from 'ui/Image';
import { getMode } from 'modules/utils';
import { useUI } from 'ui/context';
import { useApp } from 'modules/AppContext';
import { toast } from 'react-toastify';

const Qpay = () => {
  const { query, addQuery } = useAddQuery();
  const { orderId } = query;
  const mode = getMode();
  const { qpay, remainder } = useCheckoutContext();
  const { setModalView, openModal } = useUI();
  const { orderDetail } = useApp();
  const {} = orderDetail;

  const [createInvoice, { loading }] = useMutation(
    gql(mutations.createQpaySimpleInvoice),
    {
      variables: {
        amount: mode === 'kiosk' ? remainder : qpay,
        orderId,
      },
      onError(error) {
        toast.error(error.message);
      },
      onCompleted(data) {
        addQuery({ qpayId: data.poscCreateQpaySimpleInvoice._id });
        setModalView('QPAY_VIEW');
        openModal();
      },
      refetchQueries: [{ query: gql(queries.orderDetail) }, 'orderDetail'],
    }
  );

  const handleClick = () => {
    if (mode === 'kiosk' && (orderDetail.qpayInvoices || []).length > 0) {
      addQuery({ qpayId: orderDetail.qpayInvoices[0]._id });
      setModalView('QPAY_VIEW');
      openModal();
      return;
    }
    return createInvoice();
  };

  return (
    <PaymentMethod
      name="qpay"
      onClick={handleClick}
      loading={loading}
      btnText="Нэхэмжлэл үүсгэх"
    >
      <Image src="/qpay.png" alt="" fill quality={100} />
    </PaymentMethod>
  );
};

export default Qpay;
