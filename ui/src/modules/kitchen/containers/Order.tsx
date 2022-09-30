import { useMutation, gql } from '@apollo/client';
import { mutations } from 'modules/checkout/graphql';
import Button from 'ui/Button';

const OrderContainer = ({ _id, setAllDone }: any) => {
  const [orderChangeStatus, { loading }] = useMutation(
    gql(mutations.orderChangeStatus),
    {
      variables: { _id: _id, status: 'done' },
      onCompleted() {
        setAllDone(true);
      },
    }
  );

  return (
    <Button
      variant="slim"
      loading={loading}
      onClick={() => orderChangeStatus()}
    >
      Бэлэн болсон
    </Button>
  );
};

export default OrderContainer;
