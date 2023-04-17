import { FC, useState } from 'react';
import type { ButtonProps } from 'ui/Button';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import SettingsButton from '../components/SettingsButton';
import { getEnv } from 'modules/utils';

const ToSafeRemainder: FC<ButtonProps> = (props) => {
  const [loading] = useState(false);
  const { currentConfig } = useConfigsContext();

  const handleClick = async () => {
    const env = getEnv();
    const domain = env.NEXT_PUBLIC_SERVER_DOMAIN;

    if (!domain) {
      return alert('Not found domain')
    }

    window.open(`${domain}/inventories/safe-remainders?branchId=${currentConfig.branchId}&departmentId=${currentConfig.departmentId}`, '_blank');
  };

  return (
    <SettingsButton {...props} disabled={loading} onClick={handleClick}>
      Safe Remainder
    </SettingsButton>
  );
};

export default ToSafeRemainder;
