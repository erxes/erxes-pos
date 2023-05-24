import dynamic from 'next/dynamic';
import CheckMode from 'modules/CheckMode';
import BlackLayout from 'modules/common/ui/BlackLayout';

const Settings = dynamic(() => import('modules/settings'), {
  suspense: true,
});

const SettingsS = () => {
  return <CheckMode pos={<Settings />} superMarket={<Settings />} />;
};

SettingsS.Layout = BlackLayout;

export default SettingsS;
