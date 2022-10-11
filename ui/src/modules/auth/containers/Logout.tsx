import { useMutation, gql } from '@apollo/client';
import Icon from 'icons/Logout';
import Button from 'ui/Button';
import { toast } from 'react-toastify';
import { trimGraphqlError } from '../../utils';

const Logout = () => {
  const [logout, { loading }] = useMutation(
    gql`
      mutation {
        posLogout
      }
    `,
    {
      onCompleted() {
        window.location.href = '/login';
      },
      onError(error) {
        toast.error(trimGraphqlError(error.message));
      },
    }
  );
  return (
    <Button onClick={() => logout()} loading={loading}>
      <Icon />
      Гарах
    </Button>
  );
};

export default Logout;
