import { useCallback } from 'react';
import { useApp } from 'modules/AppContext';
import type { ICartItem } from 'modules/types';

function useTotalValue() {
  const { cart } = useApp();
  return useCallback(
    () =>
      cart.reduce(
        (total: number, { unitPrice, count }: ICartItem) =>
          unitPrice * count + total,
        0
      ),
    [cart]
  )();
}

export default useTotalValue;
