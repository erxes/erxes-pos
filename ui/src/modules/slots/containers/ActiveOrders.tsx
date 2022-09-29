import useFullOrders from 'lib/useFullOrder';
import SlotsHeader from '../components/SlotHeader';
import Loading from 'ui/Loading';
import { ORDER_STATUSES } from 'modules/constants';

const ActiveOrders = () => {
  const { fullOrders, loading } = useFullOrders({
    statuses: [ORDER_STATUSES.NEW, ORDER_STATUSES.CONFIRM],
  });

  if (loading) return <Loading />;

  return <SlotsHeader items={fullOrders} />;
};

export default ActiveOrders;
