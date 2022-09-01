import React from 'react';
import Button from 'modules/common/ui/Button';

function SlotNumber({ id }: { id: number }) {
  return <Button className="slot-number">00{id}</Button>;
}

export default SlotNumber;
