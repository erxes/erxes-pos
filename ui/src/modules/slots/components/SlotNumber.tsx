import React from 'react';
import Button from 'ui/Button';

function SlotNumber({ id }) {
  return <Button className="slot-number">00{id}</Button>;
}

export default SlotNumber;
