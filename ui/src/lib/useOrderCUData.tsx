import { useApp } from 'modules/AppContext';
import { useRouter } from 'next/router';
import type { ICartItem } from 'modules/types';
import { getMode } from 'modules/utils';
import useTotalValue from './useTotalValue';

const useOrderCUData = () => {
  const { cart, isTake, registerNumber, slotId, customerId, orderDetail } =
    useApp();
  const router = useRouter();
  const { orderId } = router.query;
  const mode = getMode();
  const totalAmount = useTotalValue();

  const mapElement = (item: ICartItem) => ({
    _id: item._id,
    productId: item.productId,
    count: item.count,
    unitPrice: item.unitPrice,
    isPackage: item.isPackage,
    isTake: item.isTake,
  });

  const getItems = () => {
    const items = (orderDetail || {}).items || [];
    const filtered = items.filter(
      ({ isPackage }: { isPackage: boolean }) => !isPackage
    );
    return filtered.map(mapElement);
  };

  const items = orderId && !cart.length ? getItems() : cart.map(mapElement);

  return {
    items,
    _id: orderId,
    type: mode === 'kiosk' ? isTake : 'eat',
    registerNumber,
    slotId,
    customerId,
    totalAmount,
  };
};

export default useOrderCUData;
