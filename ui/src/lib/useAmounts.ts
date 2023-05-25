import { useApp } from 'modules/AppContext';
import { BANK_CARDS, MOBILE, PAYMENT_TYPES } from 'modules/constants';
import { sumAmount, flatAmounts, checkElementsIncluded } from 'modules/utils';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { parseNum } from '../modules/utils';
import { useConfigsContext } from 'modules/auth/containers/Configs';

const useAmounts = () => {
  const { orderDetail } = useApp();
  const { totalAmount, paidAmounts, cashAmount, mobileAmount } =
    orderDetail || {};
  const { paymentTypes } = useConfigsContext();

  const paidAmount =
    sumAmount(paidAmounts || []) + (cashAmount || 0) + (mobileAmount || 0);

  const remainder = totalAmount - paidAmount;
  const amounts = useMemo(
    () => ({ cashAmount, mobileAmount, ...flatAmounts(paidAmounts) }),
    [cashAmount, mobileAmount, paidAmounts]
  );

  const getMax = (name: string) => {
    if (name === PAYMENT_TYPES.CASH && remainder) {
      return remainder < 0 ? 20000 : remainder + 20000
    }
    return remainder < 0 ? 0 : remainder;
  };

  const getMin = (name: string) => {
    if (name === PAYMENT_TYPES.CASH) {
      return totalAmount * -1;
    }
    if ([...BANK_CARDS, MOBILE].includes(name)) {
      return 0;
    }
    return amounts[name] * -1;
  };

  const getMaxMemo = useCallback(getMax, [remainder]);
  const getMinMemo = useCallback(getMin, [amounts, totalAmount]);

  const validateAmount = (value: number | string, name: string) => {
    const num = parseNum(value);
    if (num > getMaxMemo(name)) {
      return getMaxMemo(name);
    }
    if (num < getMinMemo(name)) {
      return getMinMemo(name);
    }
    return num;
  };

  const checkNotSplitIncluded = () => {
    const paidTypes = (paidAmounts || []).map((pa: any) => pa?.type);
    if (!paidTypes.length) return false;
    const notSplit = (
      paymentTypes?.filter((pt) => pt?.config?.notSplit) || []
    ).map((pt) => pt?.type);
    return checkElementsIncluded(paidTypes, notSplit);
  };

  return {
    paidAmount,
    remainder,
    totalAmount,
    cashAmount,
    mobileAmount,
    getMaxMemo,
    getMinMemo,
    validateAmount,
    paidAmounts,
    checkNotSplitIncluded,
  };
};

export default useAmounts;
