import { gql, useMutation } from '@apollo/client';
import { mutations } from '../graphql';
import type { FC } from 'react';
import SettingsButton from '../components/SettingsButton';
import type { ButtonProps } from 'ui/Button';

const SyncOrders: FC<
  ButtonProps & {
    onAlert: any;
  }
> = (props) => {
  const { onAlert, ...rest } = props;
  const [syncOrders, { loading }] = useMutation(gql(mutations.syncOrders), {
    onCompleted(data) {
      const { syncOrders } = data;
      if (syncOrders) {
        if (syncOrders.sumCount > syncOrders.syncedCount) {
          return onAlert(
            `${
              syncOrders.syncedCount
            } order has been synced successfully. But less count ${
              syncOrders.sumCount - syncOrders.syncedCount
            }`
          );
        }
        return onAlert(
          `${syncOrders.syncedCount} order has been synced successfully`
        );
      }
    },
    onError(error) {
      return onAlert(error.message, 'error');
    },
  });

  const handleClick = () => syncOrders();

  return (
    <SettingsButton {...rest} disabled={loading} onClick={handleClick}>
      Resync order
    </SettingsButton>
  );
};

export default SyncOrders;
