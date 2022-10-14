import useFullOrders from 'lib/useFullOrder';
import SlotsHeader from 'modules/slots/components/SlotHeader';
import { ORDER_STATUSES } from 'modules/constants';
import Loading from 'ui/Loading';
import DoneItem from '../components/DoneItem';
import { queries } from '../graphql';

const DoneOrders = () => {
  const { fullOrders, loading, subToOrderStatuses } = useFullOrders({
    statuses: ORDER_STATUSES.DONE,
    query: queries.fullOrders,
    variables: {
      sortDirection: -1,
      sortField: 'createdAt',
      perPage: 50,
    },
  });

  if (loading) return <Loading />;

  const now = new Date();

  const then = new Date(now.setHours(now.getHours() - 3));

  const last3Hours = fullOrders.filter(
    ({ modifiedAt }: any) => new Date(modifiedAt) >= then
  );

  return (
    <SlotsHeader
      items={last3Hours}
      subToOrderStatuses={subToOrderStatuses}
      ItemComponent={DoneItem}
    />
  );
};

export default DoneOrders;
