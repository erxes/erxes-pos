import { gql, useMutation } from '@apollo/client';
import { mutations } from '../graphql';
import type { FC } from 'react';
import SettingsButton from '../components/SettingsButton';
import type { ButtonProps } from 'ui/Button';

const SyncConfig: FC<
  ButtonProps & {
    configType: string;
    onAlert: any;
  }
> = (props) => {
  const { configType, onAlert, ...rest } = props;
  const [syncConfig, { loading, error }] = useMutation(
    gql(mutations.syncConfig),
    {
      variables: {
        type: configType,
      },
      onCompleted(data) {
        return onAlert(`${configType} has been synced successfully.`);
      },
      onError(error) {
        return onAlert(error.message, 'error');
      },
    }
  );

  const handleClick = () => syncConfig();

  return <SettingsButton {...rest} disabled={loading} onClick={handleClick} />;
};

export default SyncConfig;
