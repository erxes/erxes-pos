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
import { useConfigsContext } from 'modules/auth/containers/Configs';

export interface IFilter {
  isPaid: boolean | undefined;
  sortDirection: number;
  sortField: string;
  statuses: string[];
}

const Orders = () => {
  const { ALL } = ORDER_STATUSES;
  const { currentConfig } = useConfigsContext();
  const { showType } = (currentConfig || {}).kitchenScreen || {};

  const [filter, setFilter] = useState<IFilter>(
    !!getLocal('kitchen-filter')
      ? JSON.parse(getLocal('kitchen-filter'))
      : {
          isPaid: showType === 'paid' ? true : undefined,
          sortDirection: 1,
          sortField: 'createdAt',
          statuses: ORDER_STATUSES.ACTIVE.map((status) => ({
            value: status,
            label: status,
          })),
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
    statuses: ORDER_STATUSES.ACTIVE,
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
