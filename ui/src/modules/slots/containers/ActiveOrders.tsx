import SlotsHeader from '../components/SlotHeader';
import { gql, useQuery } from '@apollo/client';
import { queries } from '../graphql';
import Loading from 'ui/Loading';

const ActiveOrders = () => {
  const { data, loading } = useQuery(gql(queries.fullOrders), {
    variables: {
      statuses: ['new'],
    },
  });

  if (loading) return <Loading />;

  const activeOrders = data.fullOrders;

  return <SlotsHeader items={activeOrders} />;
};

export default ActiveOrders;
