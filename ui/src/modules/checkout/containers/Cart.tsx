import { useRouter } from 'next/router';
import { useApp } from 'modules/AppContext';
import { gql, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { queries } from '../graphql';
import CheckoutCart from '../components/Cart';

const CartContainer = () => {
  const router = useRouter();
  const { setCart } = useApp();
  const { selectedOrder } = router.query;

  const convertCartItem = (item: any) => ({
    ...item,
    isSelected: false,
    status: 'new',
    name: item.productName,
  });

  const [getSelectedOrder, { loading }] = useLazyQuery(
    gql(queries.orderDetail),
    {
      onCompleted(data) {
        const cart = data.orderDetail.items.map((item: any) =>
          convertCartItem(item)
        );
        setCart(cart);
      },
    }
  );

  useEffect(() => {
    selectedOrder && getSelectedOrder({ variables: { _id: selectedOrder } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrder]);

  if (loading) return null;

  return <CheckoutCart />;
};

export default CartContainer;
