import { useCallback } from 'react';
import { useApp } from 'modules/AppContext';
import type { ICartItem } from 'modules/types';

function useTotalValue() {
  const { cart } = useApp();

  return useCallback(
    () =>
      cart.reduce(
        (
          total: number,
          { unitPrice, count, discountAmount = 0, bonusCount = 0 }: ICartItem
        ) => {
          if (!!bonusCount) {
            if (count > bonusCount) {
              return (
                (count * discountAmount) / bonusCount - discountAmount + total
              );
            }
            return total;
          }
          return count * unitPrice + total;
        },
        0
      ),
    [cart]
  )();
}

export default useTotalValue;
