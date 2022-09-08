import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { mutations } from '../graphql';
import { queries } from 'modules/slots/graphql';
import { useApp } from 'modules/AppContext';
import { formatNum } from 'modules/utils';
import useTotalValue from 'lib/useTotalValue';
import Button from 'ui/Button';
import type { ICartItem } from 'modules/types';
import Deliver from '../components/Deliver';
import { removeSelectedOrder } from 'modules/utils';

const OrderCreateEdit = () => {
  const [type, setType] = useState('pay');
  const router = useRouter();
  const { selectedOrder } = router.query;
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

  const onCompleted = (data: any) => {
    setCart([]);

    if (type === 'pay') {
      const { _id } = (data || {}).ordersAdd || (data || {}).ordersEdit;
      router.push(`/checkout/${_id}`);
    }
    if (type === 'order') {
      removeSelectedOrder(router);
    }
  };
  const addVariables = {
    items: orderItems,
    totalAmount: total,
    type: 'eat',
  };

  const [ordersAdd, { loading }] = useMutation(gql(mutations.ordersAdd), {
    variables: addVariables,
    onCompleted,
    refetchQueries: [
      { query: gql(queries.fullOrders) }, // DocumentNode object parsed with gql
      'FullOrders', // Query name
    ],
  });
  const [ordersEdit, { loading: loadingEdit }] = useMutation(
    gql(mutations.ordersEdit),
    {
      variables: { ...addVariables, _id: selectedOrder },
      onCompleted,
    }
  );

  const handleClick = (val: string) => {
    setType(val);
    return selectedOrder ? ordersEdit() : ordersAdd();
  };

  return (
    <div className="checkout-controls">
      <div className="row">
        <div className="col-6">
          <Deliver />
        </div>
        <div className="col-6">
          <Button
            className="order"
            disabled={!total}
            onClick={() => handleClick('order')}
            loading={type === 'order' && (loading || loadingEdit)}
          >
            Захиалах
          </Button>
        </div>
      </div>
      <Button
        className="pay"
        disabled={!total}
        onClick={() => handleClick('pay')}
        loading={type === 'pay' && (loading || loadingEdit)}
      >
        Төлбөр төлөх {total ? formatNum(total) + '₮' : ''}
      </Button>
    </div>
  );
};

export default OrderCreateEdit;
