import Button from 'ui/Button';
import ArrowDown from 'icons/ArrowDown';
import { useMutation, gql } from '@apollo/client';
import { mutations } from 'modules/checkout/graphql';
import { ORDER_STATUSES } from '../../constants';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import Xmark from 'modules/common/icons/Xmark';

const DoneItem = ({ number, _id, items }: any) => {
  const { showWaiting } = useConfigsContext();
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

  const handleClose = () => {
    changeStatus({
      variables: {
        _id,
        status: ORDER_STATUSES.COMPLETE,
      },
    });
  };

  if (showWaiting)
    return (
      <Button
        className="kitchen-number"
        onClick={handleClick}
        disabled={loading}
      >
        <ArrowDown />
        {number.split('_')[1]}
      </Button>
    );

  return (
    <Button className="kitchen-number -extra" riffle={false} Component={'div'}>
      <Button variant="ghost" onClick={handleClick} disabled={loading}>
        <ArrowDown />
      </Button>
      {number.split('_')[1]}
      <Button
        variant="ghost"
        className="-close"
        disabled={loading}
        onClick={handleClose}
        title="Complete"
      >
        <Xmark />
      </Button>
    </Button>
  );
};

export default DoneItem;
