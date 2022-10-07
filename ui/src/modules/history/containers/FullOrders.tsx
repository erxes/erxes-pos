import useFullOrders from 'lib/useFullOrder';
import { queries } from '../graphql';
import HistoryItem from '../components/item';
import Loading from 'ui/Loading';
import { ORDER_STATUSES } from 'modules/constants';
import Empty from 'ui/Empty';

const FullOrders = () => {
  const { fullOrders, loading } = useFullOrders({
    statuses: ORDER_STATUSES.ALL,
    query: queries.fullOrders,
  });

  if (loading) return <Loading />;

  if (!fullOrders.length)
    return (
      <div className="flex-v-center fill">
        <Empty />
      </div>
    );

  return (
    <div className="row">
      {fullOrders.map((order: any) => (
        <div className="col-3" key={order._id}>
          <HistoryItem order={order} />
        </div>
      ))}
    </div>
  );
};

export default FullOrders;
