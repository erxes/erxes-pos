import { useQuery, gql } from '@apollo/client';
import HistoryItem from '../components/item';
import { queries } from '../graphql';
import Loading from 'ui/Loading';
import { ORDER_STATUSES } from 'modules/constants';
import NoData from 'icons/NoData';

const FullOrders = () => {
  const { data, loading } = useQuery(gql(queries.fullOrders), {
    variables: {
      statuses: ORDER_STATUSES.FULL,
    },
  });

  if (loading) return <Loading />;

  if (!data || !data.fullOrders || !data.fullOrders.length) return <NoData />;

  return (
    <div className="row">
      {data.fullOrders.map((order: any) => (
        <div className="col-3" key={order._id}>
          <HistoryItem order={order} />
        </div>
      ))}
    </div>
  );
};

export default FullOrders;
