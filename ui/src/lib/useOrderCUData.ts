import { useApp } from 'modules/AppContext';
import { useRouter } from 'next/router';
import type { ICartItem } from 'modules/types';
import { getMode } from 'modules/utils';
import useTotalValue from './useTotalValue';
import useBillType from './useBillType';

const useOrderCUData = () => {
  const {
    cart,
    type,
    registerNumber,
    customerId,
    orderDetail,
    billType,
    description,
    slotCode,
  } = useApp();
  const { isOrg } = useBillType();
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
    status: item.status ? item.status : 'new',
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
    type,
    registerNumber: registerNumber && isOrg ? registerNumber : null,
    billType: billType ? billType : null,
    slotCode,
    customerId,
    totalAmount,
    origin: mode === 'kiosk' ? 'kiosk' : 'pos',
    deliveryInfo: {
      description,
    },
  };
};

export default useOrderCUData;
