import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { mutations } from '../graphql';
import { useApp } from 'modules/AppContext';
import { formatNum } from 'modules/utils';
import useTotalValue from 'lib/useTotalValue';
import Button from 'ui/Button';
import type { ICartItem } from 'modules/types';
import Deliver from '../components/Deliver';

const GoToPaymentContainer = () => {
  const router = useRouter();
  const { cart, setCart } = useApp();
  const total = useTotalValue(cart);

  const orderItems = cart.map((item: ICartItem) => ({
    _id: item._id,
    productId: item.productId,
    count: item.count,
    unitPrice: item.unitPrice,
    isPackage: item.isPackage,
    isTake: item.isTake,
  }));

  const [ordersAdd, { data, loading, error }] = useMutation(
    gql(mutations.ordersAdd),
    {
      variables: {
        items: orderItems,
        totalAmount: total,
        type: 'eat',
      },
      onCompleted(data) {
        setCart([]);
        const { _id } = (data || {}).ordersAdd || {};
        router.push(`/checkout/${_id}`);
      },
    }
  );

  const handleClick = () => {
    return ordersAdd();
  };

  return (
    <div className="checkout-controls">
      <div className="row">
        <div className="col-6">
          <Deliver />
        </div>
        <div className="col-6">
          <Button className="order">Захиалах</Button>
        </div>
      </div>
      <Button
        className="pay"
        disabled={!total}
        onClick={handleClick}
        loading={loading}
      >
        Төлбөр төлөх {total ? formatNum(total) + '₮' : ''}
      </Button>
    </div>
  );
};

export default GoToPaymentContainer;
