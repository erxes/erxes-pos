import type { IComponent } from 'modules/types';
import { useState } from 'react';
import { useConfigsContext } from 'modules/auth/containers/Configs';
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
        <SyncConfig configType="config">Resync config</SyncConfig>
        <SyncConfig configType="products">Resync products</SyncConfig>
        <SyncOrders />
        <DeleteOrders />
        <SendData />
      </div>

      <div className="status-description">
        <b className="text-center">Захиалгын төлөвүүд</b>
        <div className="row">
          <div className="col-6 flex-v-center">
            <div className="-color -done"></div>- Done
          </div>
          <div className="col-6 flex-v-center">
            <div className="-color -doing"></div>- Doing / Redoing
          </div>
          <div className="col-6 flex-v-center">
            <div className="-color -new"></div>- New
          </div>
          <div className="col-6 flex-v-center">
            <div className="-color -complete"></div>- Complete and notPaid
          </div>
          <div className="col-6 flex-v-center">
            <div className="-color -new flex-center">*</div>- Kiosk-ooс
          </div>
          <div className="col-6 flex-v-center">
            <div className="-color -paid flex-center">
              <i>iii</i>
            </div>{' '}
            - Tөлбөр төлөгдсөн
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
