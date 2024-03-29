import useFullOrders from 'lib/useFullOrder';
import Loading from 'ui/Loading';
import { ORDER_STATUSES } from 'modules/constants';
import Waiting from '../components';

const WaitingContainer = () => {
  const { DONE, DOING, REDOING } = ORDER_STATUSES;

  const { fullOrders, loading, subToOrderStatuses, subToItems } = useFullOrders(
    {
      statuses: [DONE, DOING, REDOING],
      variables: {
        sortDirection: -1,
        sortField: 'modifiedAt',
        perPage: 30,
      },
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
