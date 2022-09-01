import { useCallback } from 'react';
import type { ICartItem } from 'modules/types';

function useTotalValue(cart: ICartItem[]) {
  const totalValue = useCallback(
    (cart: ICartItem[]) =>
      cart.reduce(
        (total, { unitPrice, count }) => unitPrice * count + total,
        0
      ),
    []
  );
  return totalValue(cart);
}

export default useTotalValue;
