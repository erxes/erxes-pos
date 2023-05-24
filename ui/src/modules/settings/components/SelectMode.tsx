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
      <option value="superMarket" selected={getMode() === 'superMarket'}>
        Supermarket
      </option>
      <option value="kiosk" selected={getMode() === 'kiosk'}>
        Kiosk
      </option>
      <option value="waiting" selected={getMode() === 'waiting'}>
        Waiting Screen
      </option>
      <option value="kitchen" selected={getMode() === 'kitchen'}>
        Kitchen Screen
      </option>
    </Select>
  );
};

export default SelectMode;
