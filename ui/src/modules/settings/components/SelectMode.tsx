import { useEffect, useState } from 'react';
import Select from 'ui/Select';
import { getMode } from 'modules/utils';

const SelectMode = () => {
  return (
    <Select
      value={getMode()}
      label="Select mode"
      onChange={(value) => localStorage.setItem('mode', value)}
    >
      <option value="pos" selected={getMode() === 'pos'}>
        POS and fullmode
      </option>
      <option value="kiosk" selected={getMode() === 'kiosk'}>
        Kiosk
      </option>
    </Select>
  );
};

export default SelectMode;
