import { gql, useMutation } from '@apollo/client';
import { mutations } from '../graphql';
import type { FC } from 'react';
import SettingsButton from '../components/SettingsButton';
import type { ButtonProps } from 'ui/Button';

const DeleteOrders: FC<
  ButtonProps & {
    onAlert: any;
  }
> = (props) => {
  const { onAlert, ...rest } = props;
  const [deleteOrders, { loading }] = useMutation(gql(mutations.deleteOrders), {
    onCompleted(data) {
      const { deleteOrders } = data;
      onAlert(
        `${deleteOrders.deletedCount} order has been synced successfully`
      );
    },
    onError(error) {
      return onAlert(error.message, 'error');
    },
  });

  const handleClick = () => deleteOrders();

  return (
    <SettingsButton {...rest} disabled={loading} onClick={handleClick}>
      Delete Less order
    </SettingsButton>
  );
};

export default DeleteOrders;
