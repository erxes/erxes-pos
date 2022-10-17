import useFullOrders from 'lib/useFullOrder';
import { useAddQuery } from 'lib/useQuery';
import { queries } from '../graphql';
import HistoryItem from '../components/item';
import Loading from 'ui/Loading';
import { ORDER_STATUSES } from 'modules/constants';
import Empty from 'ui/Empty';

const FullOrders = () => {
  const { query } = useAddQuery();
  const { searchValue, startDate, endDate } = query;

  const statuses = !!(query.statuses || []).length
    ? query.statuses
    : [...ORDER_STATUSES.ALL, 'paid'];

  const { fullOrders, loading } = useFullOrders({
    statuses: statuses,
    query: queries.fullOrders,
    variables: {
      searchValue,
      startDate,
      endDate,
      sortDirection: -1,
      sortField: 'createdAt'
    },
  });

  if (loading) return <Loading />;

  if (!fullOrders.length) return <Empty />;

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
