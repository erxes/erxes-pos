import { FC, useState } from 'react';
import type { ButtonProps } from 'ui/Button';
import SettingsButton from '../components/SettingsButton';

const ToSafeRemainder: FC<ButtonProps> = (props) => {
  const [loading] = useState(false);

  const handleClick = async () => {
    window.open('http://localhost:3000/inventories/safe-remainders', '_blank');
  };

  return (
    <SettingsButton {...props} disabled={loading} onClick={handleClick}>
      Safe Remainder
    </SettingsButton>
  );
};

export default ToSafeRemainder;
