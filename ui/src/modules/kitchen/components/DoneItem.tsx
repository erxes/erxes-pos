import Button from 'ui/Button';
import ArrowDown from 'icons/ArrowDown';
import { useMutation, gql } from '@apollo/client';
import { mutations } from 'modules/checkout/graphql';
import { ORDER_STATUSES, ORDER_ITEM_STATUSES } from '../../constants';

const DoneItem = ({ number, _id, items }: any) => {
  const [changeStatus, { loading }] = useMutation(
    gql(mutations.orderChangeStatus)
  );
  const [changeItemStatus] = useMutation(gql(mutations.orderItemChangeStatus));

  const handleClick = () => {
    items.forEach(({ _id }: any) =>
      changeItemStatus({
        variables: {
          _id,
          status: ORDER_ITEM_STATUSES.CONFIRM,
        },
      })
    );
    changeStatus({
      variables: {
        _id,
        status: ORDER_STATUSES.DOING,
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
