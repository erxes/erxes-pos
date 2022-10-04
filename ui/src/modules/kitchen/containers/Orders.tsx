import { useEffect } from 'react';
import useFullOrders from 'lib/useFullOrder';
import { ORDER_STATUSES, ORDER_ITEM_STATUSES } from 'modules/constants';
import Loading from 'modules/common/ui/Loading';
import Order from '../components/Order';
import Grid from 'ui/Grid';

const Orders = () => {
  const { NEW, DOING, ALL } = ORDER_STATUSES;

  const { loading, fullOrders, subToOrderStatuses, subToItems } = useFullOrders(
    {
      statuses: [NEW, DOING],
    }
  );

  useEffect(() => {
    subToOrderStatuses(ALL);
    subToItems(ORDER_ITEM_STATUSES.ALL);
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Grid data={fullOrders} Component={Order} />
    </>
  );
};

export default Orders;
