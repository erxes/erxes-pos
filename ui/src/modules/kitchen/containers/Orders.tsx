/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useFullOrders from 'lib/useFullOrder';
import { ORDER_STATUSES, ORDER_ITEM_STATUSES } from 'modules/constants';
import Loading from 'ui/Loading';
import Order from '../components/Order';
import Grid from 'ui/Grid';
import Filter from '../components/Filter';
import { getLocal } from 'modules/utils';
import Button from 'ui/Button';

export interface IFilter {
  isPaid: boolean | undefined;
  sortDirection: number;
  sortField: string;
}

const Orders = () => {
  const { NEW, DOING, ALL, REDOING, PENDING } = ORDER_STATUSES;
  const [filter, setFilter] = useState<IFilter>(
    !!getLocal('kitchen-filter')
      ? JSON.parse(getLocal('kitchen-filter'))
      : {
          isPaid: undefined,
          sortDirection: 1,
          sortField: 'createdAt',
        }
  );

  const {
    loading,
    fullOrders,
    subToOrderStatuses,
    subToItems,
    totalCount,
    handleLoadMore,
  } = useFullOrders({
    statuses: [NEW, DOING, REDOING, PENDING],
    variables: {
      ...filter,
      perPage: 30,
    },
  });

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
      <Filter setFilter={setFilter} filter={filter} />
      <Grid data={orders} Component={Order}>
        {totalCount > fullOrders.length && (
          <div className="col-12 text-center flex-0">
            <Button
              onClick={handleLoadMore}
              disabled={loading}
              className="kitchen-load-more"
            >
              Цааш үзэх {fullOrders.length} / {totalCount}
            </Button>
          </div>
        )}
      </Grid>
    </>
  );
};

export default Orders;
