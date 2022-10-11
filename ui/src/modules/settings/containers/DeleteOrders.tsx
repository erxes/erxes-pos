import { gql, useMutation } from '@apollo/client';
import { mutations } from '../graphql';
import type { FC } from 'react';
import SettingsButton from '../components/SettingsButton';
import type { ButtonProps } from 'ui/Button';
import { toast } from 'react-toastify';

const DeleteOrders: FC<ButtonProps> = (props) => {
  const [deleteOrders, { loading }] = useMutation(gql(mutations.deleteOrders), {
    onCompleted(data) {
      const { deleteOrders } = data;
      toast.success(
        `${deleteOrders.deletedCount} order has been deleted successfully`
      );
    },
    onError(error) {
      return toast.error(error.message);
    },
  });

  const handleClick = () => deleteOrders();

  return (
    <SettingsButton {...props} disabled={loading} onClick={handleClick}>
      Delete Less order
    </SettingsButton>
  );
};

export default DeleteOrders;
