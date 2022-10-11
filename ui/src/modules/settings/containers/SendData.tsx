import { FC, useState } from 'react';
import type { ButtonProps } from 'ui/Button';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import SettingsButton from '../components/SettingsButton';
import { toast } from 'react-toastify';

const SendData: FC<ButtonProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const { currentConfig } = useConfigsContext();

  const handleClick = async () => {
    setLoading(true);
    const { ebarimtConfig } = currentConfig;

    fetch(`${ebarimtConfig.ebarimtUrl}/sendData?lib=${ebarimtConfig.companyRD}`)
      .then((res: any) => res.json())
      .then((res) => {
        if (res.success) {
          return toast.success(`Амжилттай.`);
        }
        return toast.error(`Амжилтгүй: ${res.message}.`);
      })
      .catch((e) => {
        toast.error(`${e.message}`);
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <SettingsButton {...props} disabled={loading} onClick={handleClick}>
      Send - Data
    </SettingsButton>
  );
};

export default SendData;
