/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import useFullOrders from 'lib/useFullOrder';
import { useAddQuery } from 'lib/useQuery';
import { queries } from '../graphql';
import HistoryItem from '../components/item';
import Loading from 'ui/Loading';
import { ORDER_STATUSES } from 'modules/constants';
import Empty from 'ui/Empty';
import Button from 'ui/Button';
import Scroll from 'modules/kiosk/components/Scroll';

const FullOrders = () => {
  const { query } = useAddQuery();
  const { searchValue, startDate, endDate } = query;

  const statuses = !!(query.statuses || []).length
    ? query.statuses
    : [...ORDER_STATUSES.ALL, 'paid'];

  const {
    fullOrders,
    loading,
    totalCount,
    handleLoadMore,
    subToOrderStatuses,
  } = useFullOrders({
    statuses: statuses,
    query: queries.fullOrders,
    variables: {
      searchValue: searchValue ? searchValue : null,
      startDate: startDate ? startDate : null,
      endDate: endDate ? endDate : null,
      sortDirection: -1,
      sortField: 'createdAt',
    },
  });

  useEffect(() => {
    subToOrderStatuses([...(Array.isArray(statuses) ? statuses : [])]);
  }, []);

  if (loading) return <Loading />;

  if (!fullOrders.length) return <Empty />;

  return (
    <div className="scroll-container">
      <Scroll>
        <div className="row">
          {fullOrders.map((order: any) => (
            <div className="col-3" key={order._id}>
              <HistoryItem order={order} />
            </div>
          ))}
          {totalCount > fullOrders.length && (
            <div className="col-12 text-center">
              <Button onClick={handleLoadMore} disabled={loading}>
                Цааш үзэх {fullOrders.length} / {totalCount}
              </Button>
            </div>
          )}
        </div>
      </Scroll>
    </div>
  );
};

export default FullOrders;
