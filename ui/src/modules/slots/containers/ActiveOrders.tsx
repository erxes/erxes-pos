import useFullOrders from 'lib/useFullOrder';
import SlotsHeader from '../components/SlotHeader';
import Loading from 'ui/Loading';
import { ORDER_STATUSES } from 'modules/constants';

const ActiveOrders = () => {
  const { ALL, COMPLETE } = ORDER_STATUSES;

  const { fullOrders, loading } = useFullOrders({
    statuses: ORDER_STATUSES.ALL,
  });

  const orders = fullOrders.filter(
    ({ status, paidDate }: any) => status !== COMPLETE || !paidDate
  );

  if (loading) return <Loading />;

  return <SlotsHeader items={orders} />;
};

export default ActiveOrders;
