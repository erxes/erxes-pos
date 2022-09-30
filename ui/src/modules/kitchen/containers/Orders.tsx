import { useEffect } from 'react';
import useFullOrders from 'lib/useFullOrder';
import { ORDER_STATUSES } from 'modules/constants';
import Loading from 'modules/common/ui/Loading';
import Order from '../components/Order';
import Grid from 'ui/Grid';

const Orders = () => {
  const { PAID, DOING, CONFIRM, ALL } = ORDER_STATUSES;

  const { loading, fullOrders, subToOrderStatuses } = useFullOrders({
    statuses: [PAID, DOING, CONFIRM],
  });

  useEffect(() => {
    subToOrderStatuses(ALL);
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Grid data={fullOrders} Component={Order} />
    </>
  );
};

export default Orders;
