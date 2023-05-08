/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import useFullOrders from 'lib/useFullOrder';
import { ORDER_STATUSES, ORDER_ITEM_STATUSES } from 'modules/constants';
import Loading from 'modules/common/ui/Loading';
import Order from '../components/Order';
import Grid from 'ui/Grid';

const Orders = () => {
  const { NEW, DOING, ALL, REDOING, PENDING } = ORDER_STATUSES;

  const { loading, fullOrders, subToOrderStatuses, subToItems } = useFullOrders(
    {
      statuses: [NEW, DOING, REDOING, PENDING],
      variables: {
        sortDirection: 1,
        sortField: 'createdAt',
        perPage: 30,
      },
    }
  );

  const orders = fullOrders.filter(
    ({ paidDate, origin }: any) => origin !== 'kiosk' || !!paidDate
  );

  useEffect(() => {
    subToOrderStatuses(ALL);
    subToItems(ORDER_ITEM_STATUSES.ALL);
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Grid data={orders} Component={Order} />
    </>
  );
};

export default Orders;
