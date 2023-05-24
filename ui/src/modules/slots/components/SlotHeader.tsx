/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import HorizontalScroll from 'modules/common/ui/scrollMenu';
import { ORDER_STATUSES } from 'modules/constants';

function SlotsHeader({
  items = [],
  subToOrderStatuses,
  ItemComponent,
  LastComponent,
}: {
  items?: {
    status: string;
  }[];
  subToOrderStatuses?: any;
  ItemComponent: any;
  LastComponent?: any;
}) {
  useEffect(() => {
    subToOrderStatuses && subToOrderStatuses(ORDER_STATUSES.ALL);
  }, []);

  return (
    <>
      <div className="slot-header flex-v-center flex-1 overflow-hidden">
        <HorizontalScroll
          items={items}
          ItemComponent={ItemComponent}
          LastComponent={LastComponent}
        />
      </div>
    </>
  );
}

export default SlotsHeader;
