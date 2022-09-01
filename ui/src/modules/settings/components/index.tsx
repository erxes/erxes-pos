import { IComponent } from 'modules/types';
import Image from 'next/future/image';
import Select from 'modules/common/ui/Select';
import Button, { ButtonProps } from 'modules/common/ui/Button';

const SettingsButton = (props: ButtonProps) => (
  <div className="col col-4">
    <Button {...props} variant="slim" />
  </div>
);

const Settings: IComponent = () => {
  return (
    <div className="settings flex-center white-tab">
      <div className="img-wrap">
        <Image src="/user.png" alt="" fill quality={100} />
      </div>
      <b>Myagmardor.TS</b>
      <small>support@erxes.io</small>
      <small className="info">
        <span>Online Yoshinoya: </span>
        <b>2022-07-22T02:59:58.494Z</b>
      </small>
      <Select value="pos" label="Select mode">
        <option value="pos">POS and fullmode</option>
        <option value="Kiosk">Kiosk</option>
      </Select>
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
