import type { IComponent } from 'modules/types';
import { useState } from 'react';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import useAlert from 'ui/Alert';
import Image from 'next/future/image';
import SelectMode from './components/SelectMode';
import SyncConfig from './containers/SyncConfig';
import SyncOrders from './containers/SyncOrders';
import DeleteOrders from './containers/DeleteOrders';
import SendData from './containers/SendData';

const Settings: IComponent = () => {
  const { currentUser, currentConfig } = useConfigsContext();
  const { username, email, details, createdAt } = currentUser;
  const [avatar, setAvatar] = useState(details.avatar);
  const { onAlert, Alert } = useAlert();
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
      <Alert />
      <div className="controls row">
        <SyncConfig onAlert={onAlert} configType="config">
          Resync config
        </SyncConfig>
        <SyncConfig onAlert={onAlert} configType="products">
          Resync products
        </SyncConfig>
        <SyncOrders onAlert={onAlert} />
        <DeleteOrders onAlert={onAlert} />
        <SendData onAlert={onAlert} />
      </div>
    </div>
  );
};

export default Settings;
