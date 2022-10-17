import { useEffect } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
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
  const [getFullOrders, { loading, data, subscribeToMore, refetch }] =
    useLazyQuery(gql(query ? query : queries.fullOrders), {
      variables: {
        statuses: checkIsArray(statuses),
        ...(variables || {}),
      },
      fetchPolicy,
    });

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

  useEffect(() => {
    statuses && getFullOrders();
  }, []);

  return {
    loading,
    fullOrders: (data || {}).fullOrders || [],
    subToOrderStatuses,
    refetch,
    subToItems,
  };
};

export default useFullOrders;
