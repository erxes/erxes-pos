import React from 'react';
import HorizontalScroll from 'modules/common/ui/scrollMenu';
import SlotNumber from './SlotNumber';
import CaretDown from 'modules/common/icons/CaretDown';
import Button from 'modules/common/ui/Button';

function SlotsHeader() {
  return (
    <>
      <Button variant="naked" className="slot-dropdown">
        Level 1
        <CaretDown width={18} />
      </Button>
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
