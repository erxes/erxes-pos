import { useQuery, gql } from '@apollo/client';
import useFullOrders from 'lib/useFullOrder';
import { queries, subscriptions } from 'modules/checkout/graphql';
import Loading from 'ui/Loading';
import { ORDER_STATUSES } from 'modules/constants';
import Waiting from '../components';

const WaitingContainer = () => {
  const { fullOrders, loading, subscribeToMore, refetch } = useFullOrders({
    statuses: ORDER_STATUSES.DONE,
  });

  const {
    fullOrders: ordersConfirm,
    loading: confirmLoading,
    refetch: refetchConfirm,
  } = useFullOrders({
    statuses: ORDER_STATUSES.ACTIVE,
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
          refetchConfirm();
        }

        return prev;
      },
    });

  const {
    data: orderItemsData,
    loading: loadingOrderItems,
    subscribeToMore: subscribeToItems,
    refetch: refetchOrderItems,
  } = useQuery(gql(queries.fullOrderItems), {
    variables: { statuses: [ORDER_STATUSES.DONE] },
  });

  const subToItems = () =>
    subscribeToItems({
      document: gql(subscriptions.orderItemsOrdered),
      variables: { statuses: ORDER_STATUSES.FULL },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const changedOrderItem = subscriptionData.data.orderItemsOrdered;
        if (changedOrderItem) {
          refetchOrderItems();
        }
      },
    });

  if (loading || confirmLoading || loadingOrderItems) return <Loading />;

  const updatedProps = {
    subToOrderStatuses,
    orders: fullOrders,
    ordersConfirm,
    orderItems: (orderItemsData || {}).fullOrderItems || [],
    subToItems,
  };
  return <Waiting {...updatedProps} />;
};

export default WaitingContainer;
