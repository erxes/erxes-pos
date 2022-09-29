import { useQuery, gql } from '@apollo/client';
import { queries } from 'modules/checkout/graphql';

const useFullOrders = ({
  statuses,
  fetchPolicy = 'network-only',
  query,
}: any) => {
  const { loading, data, subscribeToMore, refetch } = useQuery(
    gql(query ? query : queries.fullOrders),
    {
      variables: { statuses: Array.isArray(statuses) ? statuses : [statuses] },
      fetchPolicy,
    }
  );

  return {
    loading,
    fullOrders: (data || {}).fullOrders || [],
    subscribeToMore,
    refetch,
  };
};

export default useFullOrders;
