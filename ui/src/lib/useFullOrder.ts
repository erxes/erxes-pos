import { useQuery, gql } from '@apollo/client';
import { queries, subscriptions } from 'modules/checkout/graphql';

type IStatuses = string | string[];

const checkIsArray = (statuses: IStatuses) =>
  Array.isArray(statuses) ? statuses : [statuses];

const useFullOrders = ({
  statuses,
  fetchPolicy = 'network-only',
  query,
  variables,
}: any) => {
  const { loading, data, subscribeToMore, refetch } = useQuery(
    gql(query ? query : queries.fullOrders),
    {
      variables: {
        statuses: checkIsArray(statuses),
        ...(variables || {}),
      },
      fetchPolicy,
    }
  );

  const subToOrderStatuses = (subStatuses: IStatuses, callBack?: any) =>
    subscribeToMore({
      document: gql(subscriptions.ordersOrdered),
      variables: { statuses: checkIsArray(subStatuses) },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const changedOrder = subscriptionData.data.ordersOrdered;
        if (changedOrder) {
          refetch();
          callBack && callBack();
        }
        return prev;
      },
    });

  const subToItems = (subStatuses: IStatuses, callBack?: any) =>
    subscribeToMore({
      document: gql(subscriptions.orderItemsOrdered),
      variables: { statuses: checkIsArray(subStatuses) },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const changedOrderItem = subscriptionData.data.orderItemsOrdered;
        if (changedOrderItem) {
          refetch();
          callBack && callBack();
        }
      },
    });

  return {
    loading,
    fullOrders: (data || {}).fullOrders || [],
    subToOrderStatuses,
    refetch,
    subToItems,
  };
};

export const useFullOrderItems = ({
  statuses,
  fetchPolicy = 'network-only',
  query,
}: any) => {
  const { loading, data, subscribeToMore, refetch } = useQuery(
    gql(query ? query : queries.fullOrderItems),
    {
      variables: { statuses: checkIsArray(statuses) },
      fetchPolicy,
    }
  );

  const subToItems = (subStatuses: IStatuses, callBack: any) =>
    subscribeToMore({
      document: gql(subscriptions.orderItemsOrdered),
      variables: { statuses: checkIsArray(subStatuses) },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const changedOrderItem = subscriptionData.data.orderItemsOrdered;
        if (changedOrderItem) {
          refetch();
          callBack();
        }
      },
    });

  return {
    loading,
    orderItems: (data || {}).fullOrderItems || [],
    subToItems,
    refetch,
  };
};

export default useFullOrders;
