import useFullOrders from 'lib/useFullOrder';
import Loading from 'ui/Loading';
import { ORDER_STATUSES } from 'modules/constants';
import Waiting from '../components';

const WaitingContainer = () => {
  const { DONE, DOING } = ORDER_STATUSES;

  const { fullOrders, loading, subToOrderStatuses, subToItems } = useFullOrders(
    {
      statuses: [DONE, DOING],
    }
  );

  if (loading) return <Loading />;

  const updatedProps = {
    subToOrderStatuses,
    orders: fullOrders,
    subToItems,
  };
  return <Waiting {...updatedProps} />;
};

export default WaitingContainer;
