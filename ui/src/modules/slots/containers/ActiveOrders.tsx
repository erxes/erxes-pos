import useFullOrders from 'lib/useFullOrder';
import SlotsHeader from '../components/SlotHeader';
import { queries } from '../graphql';
import { ORDER_STATUSES } from 'modules/constants';
import SlotNumber from '../components/SlotNumber';
import Button from 'ui/Button';

const ActiveOrders = () => {
  const { ALL } = ORDER_STATUSES;

  const {
    fullOrders,
    loading,
    subToOrderStatuses,
    totalCount,
    handleLoadMore,
  } = useFullOrders({
    statuses: ALL,
    variables: {
      isPaid: false,
      sortDirection: -1,
      sortField: 'createdAt',
    },
    query: queries.fullOrders,
  });

  const orders = (fullOrders || []);

  return (
    <SlotsHeader
      items={orders}
      subToOrderStatuses={subToOrderStatuses}
      ItemComponent={SlotNumber}
      LastComponent={
        totalCount > fullOrders.length && (
          <Button
            className="-load"
            variant="slim"
            onClick={handleLoadMore}
            loading={loading}
          >
            Цааш үзэх {fullOrders.length} / {totalCount}
          </Button>
        )
      }
    />
  );
};

export default ActiveOrders;
