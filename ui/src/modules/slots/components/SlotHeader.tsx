import React from 'react';
import HorizontalScroll from 'ui/scrollMenu';
import SlotNumber from './SlotNumber';
import CaretDown from 'icons/CaretDown';

function SlotsHeader() {
  return (
    <>
      <div className="slot-dropdown flex-v-center flex-0">
        <p>Level 1 </p>
        <CaretDown width={18} />
      </div>
      <div className="slot-header flex-v-center flex-1">
        <HorizontalScroll
          items={[
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
            { id: 6 },
            { id: 7 },
            { id: 8 },
            { id: 9 },
            { id: 10 },
            { id: 11 },
            { id: 12 },
            { id: 13 },
            { id: 14 },
            { id: 15 },
            { id: 16 },
            { id: 17 },
            { id: 18 },
            { id: 19 },
            { id: 20 },
          ]}
          ItemComponent={SlotNumber}
        />
      </div>
    </>
  );
}

export default SlotsHeader;
