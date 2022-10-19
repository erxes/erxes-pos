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
  variables: restVariables,
}: any) => {
  const variables = {
    statuses: checkIsArray(statuses),
    ...(restVariables || {}),
  };

  const PER_PAGE = 28;

  const [
    getFullOrders,
    { loading, data, subscribeToMore, refetch, fetchMore },
  ] = useLazyQuery(gql(query ? query : queries.fullOrders), {
    variables: {
      ...variables,
      page: 1,
      perPage: PER_PAGE,
    },
    fetchPolicy,
  });

  const [getOrdersTotalCount, { loading: loadCount, data: countData }] =
    useLazyQuery(gql(queries.ordersTotalCount), {
      variables,
      fetchPolicy,
    });

  const fullOrders = (data || {}).fullOrders || [];
  const totalCount = (countData || {}).ordersTotalCount || 0;

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

  const handleLoadMore = () => {
    if (totalCount > fullOrders.length) {
      fetchMore({
        variables: {
          page: Math.ceil(fullOrders.length / PER_PAGE) + 1,
          perPage: PER_PAGE,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            fullOrders: [
              ...(prev.fullOrders || []),
              ...fetchMoreResult.fullOrders,
            ],
          });
        },
      });
    }
  };

  useEffect(() => {
    getFullOrders();
    getOrdersTotalCount();
  }, []);

  return {
    loading: loading || loadCount,
    fullOrders,
    subToOrderStatuses,
    refetch,
    subToItems,
    totalCount,
    handleLoadMore,
  };
};

export default useFullOrders;
