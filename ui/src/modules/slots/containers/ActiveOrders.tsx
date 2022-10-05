import useFullOrders from 'lib/useFullOrder';
import SlotsHeader from '../components/SlotHeader';
import { queries } from '../graphql';
import Loading from 'ui/Loading';
import { ORDER_STATUSES } from 'modules/constants';

const ActiveOrders = () => {
  const { ALL, COMPLETE } = ORDER_STATUSES;

  const { fullOrders, loading, subToOrderStatuses } = useFullOrders({
    statuses: ALL,
    variables: {
      sortDirection: -1,
      perPage: 1000,
    },
    query: queries.fullOrders,
  });

  const orders = fullOrders.filter(
    ({ status, paidDate }: any) => status !== COMPLETE || !paidDate
  );

  if (loading) return <Loading />;

  return (
    <SlotsHeader
      items={orders.reverse()}
      subToOrderStatuses={subToOrderStatuses}
    />
  );
};

export default ActiveOrders;
