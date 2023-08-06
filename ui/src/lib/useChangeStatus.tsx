import { gql, useMutation } from '@apollo/client';
import { mutations } from 'modules/checkout/graphql';
import { ORDER_STATUSES } from 'modules/constants';

const useChangeStatus = () => {
  const [changeStatus, { loading }] = useMutation(
    gql(mutations.orderChangeStatus)
  );

  const handleChangeStatus = ({
    _id,
    status,
  }: {
    _id: string;
    status: string;
  }) =>
    changeStatus({
      variables: {
        _id,
        status,
      },
    });

  return { handleChangeStatus, loading, ORDER_STATUSES };
};

export default useChangeStatus;
