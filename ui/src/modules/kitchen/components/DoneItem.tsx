import Button from 'ui/Button';
import ArrowDown from 'icons/ArrowDown';
import { useMutation, gql } from '@apollo/client';
import { mutations } from 'modules/checkout/graphql';
import { ORDER_STATUSES } from '../../constants';

const DoneItem = ({ number, _id, items }: any) => {
  const [changeStatus, { loading }] = useMutation(
    gql(mutations.orderChangeStatus)
  );

  const handleClick = () => {
    changeStatus({
      variables: {
        _id,
        status: ORDER_STATUSES.REDOING,
      },
    });
  };

  return (
    <Button className="kitchen-number" onClick={handleClick} disabled={loading}>
      <ArrowDown />
      {number.split('_')[1]}
    </Button>
  );
};

export default DoneItem;
