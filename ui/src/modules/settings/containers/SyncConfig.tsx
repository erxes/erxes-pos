import { gql, useMutation } from '@apollo/client';
import { mutations } from '../graphql';
import type { FC } from 'react';
import SettingsButton from '../components/SettingsButton';
import type { ButtonProps } from 'ui/Button';
import { toast } from 'react-toastify';

const SyncConfig: FC<
  ButtonProps & {
    configType: string;
  }
> = (props) => {
  const { configType, ...rest } = props;
  const [syncConfig, { loading, error }] = useMutation(
    gql(mutations.syncConfig),
    {
      variables: {
        type: configType,
      },
      onCompleted(data) {
        return toast.success(`${configType} has been synced successfully.`);
      },
      onError(error) {
        return toast.error(error.message);
      },
    }
  );

  const handleClick = () => syncConfig();

  return <SettingsButton {...rest} disabled={loading} onClick={handleClick} />;
};

export default SyncConfig;
