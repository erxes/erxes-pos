import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useApp } from 'modules/AppContext';
import { gql, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { queries, subscriptions } from '../graphql';
import { ORDER_ITEM_STATUSES, ORDER_STATUSES } from 'modules/constants';
import { toast } from 'react-toastify';
import CheckMode from 'modules/CheckMode';
import { getMode } from 'modules/utils';

const CheckoutCart = dynamic(() => import('../components/Cart'), {
  suspense: true,
});

const CartContainer = () => {
  const router = useRouter();
  const {
    setInitialState,
    setCart,
    setOrderDetail,
    setType,
    setCustomerId,
    setBillType,
    setDescription,
    setSlotCode,
  } = useApp();
  const { orderId } = router.query;

  const convertCartItem = (item: any) => ({
    ...item,
    name: item.productName,
  });

  const [getSelectedOrder, { loading, subscribeToMore, refetch }] =
    useLazyQuery(gql(queries.orderDetail), {
      onCompleted(data) {
        const { orderDetail } = data || {};
        if (orderDetail) {
          if (getMode() === 'kiosk' && orderDetail.paidDate) {
            return (window.location.href = '/');
          }
          const { items, customerId, type, billType, deliveryInfo, slotCode } =
            orderDetail;

          const cart = (items || []).map((item: any) => convertCartItem(item));

          setOrderDetail(orderDetail);
          setType(type);
          setCart(cart);
          setCustomerId(customerId || '');
          setBillType(billType || '');
          setDescription((deliveryInfo || {}).description || '');
          setSlotCode(slotCode || '');
        }
      },
      fetchPolicy: 'network-only',
      onError(error) {
        toast.error(error.message);
      },
    });

  const subToItems = () =>
    subscribeToMore({
      document: gql(subscriptions.orderItemsOrdered),
      variables: { statuses: ORDER_ITEM_STATUSES.ALL },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const changedOrderItem = subscriptionData.data.orderItemsOrdered;

        const check =
          prev.orderDetail.items
            .map(({ _id }: any) => _id)
            .indexOf(changedOrderItem._id) > -1;

        if (check) {
          refetch();
        }
      },
    });

  const subToOrderStatuses = () =>
    subscribeToMore({
      document: gql(subscriptions.ordersOrdered),
      variables: { statuses: ORDER_STATUSES.ALL },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const changedOrder = subscriptionData.data.ordersOrdered;
        if (changedOrder) {
          refetch();
        }
        return prev;
      },
    });

  useEffect(() => {
    if (orderId) {
      getSelectedOrder({ variables: { _id: orderId } });
      subToItems();
      subToOrderStatuses();
      return;
    }
    getMode() === 'pos' && setInitialState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  if (loading) return <div className="checkout-cart"></div>;

  return <CheckMode pos={<CheckoutCart />} kiosk={<></>} />;
};

export default CartContainer;
