import { FC, useState } from 'react';
import type { ButtonProps } from 'ui/Button';
import SettingsButton from '../components/SettingsButton';
import { getEnv } from 'modules/utils';

const ToErxesLink: FC<ButtonProps & { title: string, currentLink: string }> = (props) => {
  const [loading] = useState(false);
  const { title, currentLink } = props

  const handleClick = async () => {
    const env = getEnv();
    const domain = env.NEXT_PUBLIC_SERVER_DOMAIN;

    if (!domain) {
      return alert('Not found domain')
    }

    window.open(`${domain}${currentLink}`, '_blank');
  };

  return (
    <SettingsButton {...props} disabled={loading} onClick={handleClick}>
      {title}
    </SettingsButton>
  );
};

export default ToErxesLink;
