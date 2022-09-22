import { gql, useMutation } from '@apollo/client';
import { mutations } from '../graphql';
import type { FC } from 'react';
import SettingsButton from '../components/SettingsButton';
import type { ButtonProps } from 'ui/Button';
import { toast } from 'react-toastify';

const SyncOrders: FC<ButtonProps> = (props) => {
  const [syncOrders, { loading }] = useMutation(gql(mutations.syncOrders), {
    onCompleted(data) {
      const { syncOrders } = data;
      if (syncOrders) {
        if (syncOrders.sumCount > syncOrders.syncedCount) {
          return toast.success(
            `${
              syncOrders.syncedCount
            } order has been synced successfully. But less count ${
              syncOrders.sumCount - syncOrders.syncedCount
            }`
          );
        }
        return toast.success(
          `${syncOrders.syncedCount} order has been synced successfully`
        );
      }
    },
    onError(error) {
      return toast.error(error.message);
    },
  });

  const handleClick = () => syncOrders();

  return (
    <SettingsButton {...props} disabled={loading} onClick={handleClick}>
      Resync order
    </SettingsButton>
  );
};

export default SyncOrders;
