import { useQuery, gql } from '@apollo/client';
import { queries, subscriptions } from 'modules/checkout/graphql';
import Loading from 'ui/Loading';
import { ORDER_STATUSES } from 'modules/constants';
import Waiting from '../components';

const WaitingContainer = () => {
  const { data, loading, subscribeToMore, refetch } = useQuery(
    gql(queries.fullOrders),
    {
      variables: {
        statuses: [ORDER_STATUSES.DONE],
      },
      fetchPolicy: 'network-only',
    }
  );

  const subscribeToOrderStatuses = () =>
    subscribeToMore({
      document: gql(subscriptions.ordersOrdered),
      variables: { statuses: ORDER_STATUSES.ALL },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        // const changedOrder = subscriptionData.data.ordersOrdered;
        refetch();
        // return Object.assign({}, prev, {
        //   fullOrders: [...prev.fullOrders, changedOrder],
        // });
      },
    });

  const {
    data: cofirmData,
    loading: confirmLoading,
    subscribeToMore: subscribeToItems,
  } = useQuery(gql(queries.fullOrders), {
    variables: {
      statuses: ['new'],
    },
    fetchPolicy: 'network-only',
  });

  if (loading || confirmLoading) return <Loading />;

  const updatedProps = {
    subscribeToOrderStatuses,
    orders: (data || {}).fullOrders || [],
  };
  return <Waiting {...updatedProps} />;
};

export default WaitingContainer;
