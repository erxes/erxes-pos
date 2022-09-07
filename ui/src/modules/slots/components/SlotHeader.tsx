import React from 'react';
import HorizontalScroll from 'modules/common/ui/scrollMenu';
import SlotNumber from './SlotNumber';
import CaretDown from 'modules/common/icons/CaretDown';
import Button from 'modules/common/ui/Button';

function SlotsHeader({
  items,
}: {
  items: {
    status: string;
  }[];
}) {
  return (
    <>
      <Button variant="naked" className="slot-dropdown">
        Level 1
        <CaretDown width={18} />
      </Button>
      <div className="slot-header flex-v-center flex-1">
        <HorizontalScroll items={items} ItemComponent={SlotNumber} />
      </div>
    </>
  );
}

export default SlotsHeader;
