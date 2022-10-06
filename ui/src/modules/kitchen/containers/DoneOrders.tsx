import useFullOrders from 'lib/useFullOrder';
import SlotsHeader from 'modules/slots/components/SlotHeader';
import { ORDER_STATUSES } from 'modules/constants';
import Loading from 'ui/Loading';
import DoneItem from '../components/DoneItem';

const DoneOrders = () => {
  const { fullOrders, loading, subToOrderStatuses } = useFullOrders({
    statuses: ORDER_STATUSES.DONE,
    variables: {
      sortDirection: -1,
    },
  });

  if (loading) return <Loading />;

  return (
    <SlotsHeader
      items={fullOrders}
      subToOrderStatuses={subToOrderStatuses}
      ItemComponent={DoneItem}
    />
  );
};

export default DoneOrders;
