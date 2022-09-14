import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { mutations } from '../graphql';
import { queries } from 'modules/slots/graphql';
import { useApp } from 'modules/AppContext';
import useTotalValue from 'lib/useTotalValue';
import type { ICartItem } from 'modules/types';
import { getMode } from 'modules/utils';

const OrderCUContainer = ({
  OrderCU,
  onCompleted,
  type,
  setType,
}: {
  OrderCU: any;
  onCompleted: any;
  type?: string;
  setType?: any;
}) => {
  const router = useRouter();
  const { orderId } = router.query;
  const { isTake, cart } = useApp();
  const total = useTotalValue();

  const orderItems = cart.map((item: ICartItem) => ({
    _id: item._id,
    productId: item.productId,
    count: item.count,
    unitPrice: item.unitPrice,
    isPackage: item.isPackage,
    isTake: item.isTake,
  }));

  const addVariables = {
    items: orderItems,
    totalAmount: total,
    type: getMode() === 'kiosk' ? isTake : 'eat',
  };

  const getId = (data: any) => {
    if (data.ordersAdd) {
      return data.ordersAdd._id;
    }
    if (data.ordersEdit) {
      return data.ordersEdit._id;
    }
  };

  const [ordersAdd, { loading }] = useMutation(gql(mutations.ordersAdd), {
    variables: addVariables,
    onCompleted(data) {
      return onCompleted(getId(data));
    },
    refetchQueries: [{ query: gql(queries.fullOrders) }, 'FullOrders'],
  });
  const [ordersEdit, { loading: loadingEdit }] = useMutation(
    gql(mutations.ordersEdit),
    {
      variables: { ...addVariables, _id: orderId },
      onCompleted(data) {
        return onCompleted(getId(data));
      },
    }
  );

  const updatedProps = {
    ordersAdd,
    ordersEdit,
    loading,
    loadingEdit,
    type,
    setType,
  };

  return <OrderCU {...updatedProps} />;
};

export default OrderCUContainer;
