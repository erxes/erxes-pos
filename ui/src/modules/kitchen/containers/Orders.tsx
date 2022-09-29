import useFullOrders from 'lib/useFullOrder';
import { ORDER_STATUSES } from 'modules/constants';
import Loading from 'modules/common/ui/Loading';
import Order from '../components/Order';
import Grid from 'ui/Grid';

const Orders = () => {
  const { PAID, DOING, CONFIRM } = ORDER_STATUSES;

  const { loading, fullOrders } = useFullOrders({
    statuses: [PAID, DOING, CONFIRM],
  });

  if (loading) return <Loading />;

  return (
    <>
      <Grid data={fullOrders} Component={Order} />
    </>
  );
};

export default Orders;
