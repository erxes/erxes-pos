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
    customerType,
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

  const orderDetailItems = (orderDetail || {}).items || [];

  const filterItems = (rawItems: ICartItem[]) =>
    rawItems
      .filter(({ isPackage, count }) => !isPackage && count > 0)
      .map(mapElement);

  const items = filterItems(orderId && !cart.length ? orderDetailItems : cart);

  return {
    items,
    _id: orderId,
    type,
    registerNumber: registerNumber && isOrg ? registerNumber : null,
    billType: billType || null,
    slotCode,
    customerId,
    customerType,
    totalAmount,
    origin: mode === 'kiosk' ? 'kiosk' : 'pos',
    deliveryInfo: {
      ...((orderDetail || {}).deliveryInfo || {}),
      description,
    },
  };
};

export default useOrderCUData;
