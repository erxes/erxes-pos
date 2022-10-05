import { useRouter } from 'next/router';
import { useApp } from 'modules/AppContext';
import { gql, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { queries, subscriptions } from '../graphql';
import { ORDER_ITEM_STATUSES } from 'modules/constants';
import CheckoutCart from '../components/Cart';
import { toast } from 'react-toastify';

const CartContainer = () => {
  const { NEW, CONFIRM, DONE } = ORDER_ITEM_STATUSES;
  const router = useRouter();
  const { cart, setCart, setOrderDetail } = useApp();
  const { orderId } = router.query;

  const convertCartItem = (item: any) => ({
    ...item,
    isSelected: false,
    name: item.productName,
  });

  const [getSelectedOrder, { loading, subscribeToMore, refetch }] =
    useLazyQuery(gql(queries.orderDetail), {
      onCompleted(data) {
        const { orderDetail } = data || {};
        if (orderDetail) {
          const cart = orderDetail.items.map((item: any) =>
            convertCartItem(item)
          );
          setCart(cart);
          setOrderDetail(orderDetail);
        }
      },
      onError(error) {
        toast.error(error.message);
      },
    });

  const subToItems = () =>
    subscribeToMore({
      document: gql(subscriptions.orderItemsOrdered),
      variables: { statuses: [NEW, CONFIRM, DONE] },
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

  useEffect(() => {
    if (orderId) {
      getSelectedOrder({ variables: { _id: orderId } });
      subToItems();
      return;
    }
    setCart([]);
    setOrderDetail(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  if (loading) return <div className="checkout-cart"></div>;

  return <CheckoutCart />;
};

export default CartContainer;
