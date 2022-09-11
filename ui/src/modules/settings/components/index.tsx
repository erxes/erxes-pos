import { useState } from 'react';
import { IComponent } from 'modules/types';
import Image from 'next/future/image';
import SelectMode from './SelectMode';
import Button, { ButtonProps } from 'ui/Button';
import { useConfigsContext } from 'modules/auth/containers/Configs';

const SettingsButton = (props: ButtonProps) => (
  <div className="col col-4">
    <Button {...props} variant="slim" />
  </div>
);

const Settings: IComponent = () => {
  const { currentUser, currentConfig } = useConfigsContext();
  const { username, email, details, createdAt } = currentUser;
  const [avatar, setAvatar] = useState(details.avatar);
  return (
    <div className="settings flex-center white-tab">
      <div className="img-wrap">
        <Image
          src={avatar}
          alt=""
          fill
          quality={100}
          onError={() => setAvatar('/user.png')}
        />
      </div>
      <b>{username}</b>
      <small>{email}</small>
      <small className="info">
        <span>{currentConfig.name}: </span>
        <b>{createdAt}</b>
      </small>
      <SelectMode />
      <div className="controls row">
        <SettingsButton>Resync config</SettingsButton>
        <SettingsButton>Resync customer</SettingsButton>
        <SettingsButton>Resync product</SettingsButton>
        <SettingsButton>Resync order</SettingsButton>
        <SettingsButton>Delete Less order</SettingsButton>
        <SettingsButton>Send - Data</SettingsButton>
      </div>
    </div>
  );
};

export default Settings;
