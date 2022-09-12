import dynamic from 'next/dynamic';
import { useState, Suspense } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { mutations } from '../graphql';
import { queries } from 'modules/slots/graphql';
import { useApp } from 'modules/AppContext';
import useTotalValue from 'lib/useTotalValue';
import type { ICartItem } from 'modules/types';
import { removeQuery, getMode } from 'modules/utils';

const OrderCUContainer = ({ OrderCU }: { OrderCU: any }) => {
  const [type, setType] = useState('pay');
  const router = useRouter();
  const { selectedOrder } = router.query;
  const { cart, setCart } = useApp();
  const total = useTotalValue();

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
      return router.push(`/checkout/${_id}`);
    }
    if (type === 'order') {
      return removeQuery(router, 'selectedOrder');
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
    refetchQueries: [{ query: gql(queries.fullOrders) }, 'FullOrders'],
  });
  const [ordersEdit, { loading: loadingEdit }] = useMutation(
    gql(mutations.ordersEdit),
    {
      variables: { ...addVariables, _id: selectedOrder },
      onCompleted,
    }
  );

  const updatedProps = {
    ordersAdd,
    ordersEdit,
    loading,
    loadingEdit,
    setType,
    type,
  };

  return <OrderCU {...updatedProps} />;
};

export default OrderCUContainer;
