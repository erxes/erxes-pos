import { FC, useState } from 'react';
import type { ButtonProps } from 'ui/Button';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import SettingsButton from '../components/SettingsButton';

const SendData: FC<
  ButtonProps & {
    onAlert: any;
  }
> = (props) => {
  const { onAlert, ...rest } = props;
  const [loading, setLoading] = useState(false);
  const { currentConfig } = useConfigsContext();

  const handleClick = async () => {
    setLoading(true);
    const { ebarimtConfig } = currentConfig;

    fetch(`${ebarimtConfig.ebarimtUrl}/sendData?lib=${ebarimtConfig.companyRD}`)
      .then((res: any) => res.json())
      .then((res) => {
        if (res.success) {
          return onAlert(`Амжилттай.`);
        }
        return onAlert(`Амжилтгүй: ${res.message}.`);
      })
      .catch((e) => {
        onAlert(`${e.message}`, 'error');
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <SettingsButton {...rest} disabled={loading} onClick={handleClick}>
      Send - Data
    </SettingsButton>
  );
};

export default SendData;
