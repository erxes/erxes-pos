/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, gql, useLazyQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { mutations, queries } from 'modules/checkout/graphql';
import { useCheckoutContext } from 'modules/checkout/context';
import { useApp } from 'modules/AppContext';
import { useUI } from 'ui/context';
import useAddPayment from 'lib/useAddPayment';
import { getMode } from 'modules/utils';
import Empty from 'ui/Empty';
import Loading from 'ui/Loading';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import clientMain from 'modules/apolloClientMain';

const MobileContainer = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const mode = getMode();
  const { amounts, remainder } = useCheckoutContext();
  const mobile = amounts['mobile'] || 0;
  const { customerId, customerType, description, orderDetail } = useApp();
  const { closeModal } = useUI();
  const { totalAmount, mobileAmount } = orderDetail || {};

  const { addPayment } = useAddPayment(closeModal);

  const [generateInvoiceUrl, { loading, data }] = useMutation(
    gql(mutations.generateInvoiceUrl),
    {
      client: clientMain,
      onError(error) {
        toast.error(error.message);
      },
    }
  );

  const invoiceUrl = (data || {}).generateInvoiceUrl || '';

  const { currentConfig } = useConfigsContext();

  const [getInvoices, { loading: loadingInvoices }] = useLazyQuery(
    gql(queries.invoices),
    {
      client: clientMain,
      context: { headers: { 'erxes-app-token': currentConfig.erxesAppToken } },
      variables: {
        contentType: 'pos:orders',
        contentTypeId: orderId,
      },
      fetchPolicy: 'network-only',
      onCompleted(data) {
        const invoices = (data || {}).invoices || [];

        const paidAmount = invoices
          .filter(({ status }: any) => status === 'paid')
          .reduce((total: number, { amount }: any) => total + amount, 0);

        if (paidAmount > mobileAmount) {
          addPayment({
            _id: orderId,
            mobileAmount:
              mode === 'kiosk' ? totalAmount : paidAmount - mobileAmount,
          });
          return closeModal();
        }
        generateInvoiceUrl({
          variables: {
            amount: remainder >= mobile ? mobile : remainder,
            contentType: 'pos:orders',
            contentTypeId: orderId,
            customerId: customerId || 'empty',
            customerType: customerType || 'customer',
            description: orderId + '-' + description,
            paymentIds: currentConfig.paymentIds,
          },
        });
      },
    }
  );

  useEffect(() => {
    window.addEventListener('message', (event) => {
      const { message, fromPayment } = event.data;
      if (fromPayment) {
        if (message === 'paymentSuccessfull') {
          getInvoices();
        }
      }
    });

    getInvoices();

    return removeEventListener('message', () => {});
  }, []);

  if (loading || loadingInvoices)
    return (
      <div className="mobile flex-center">
        <Loading />
      </div>
    );

  if (!invoiceUrl)
    return (
      <div className="mobile flex-center">
        <Empty />
      </div>
    );

  return (
    <div className="mobile">
      <iframe src={invoiceUrl} />
    </div>
  );
};

export default MobileContainer;
