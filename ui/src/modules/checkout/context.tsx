import React, { useCallback, useMemo, useReducer } from 'react';
import { useApp } from 'modules/AppContext';
import { IComponent } from 'modules/types';
import { parseNum, sumAmount } from 'modules/utils';

export interface State {
  activePayment: string;
  card: number;
}

const initialState = {
  activePayment: '',
  card: 0,
  cash: 0,
  asCard: 0,
  receivable: 0,
  mobile: 0,
  golomtCard: 0,
};

type PAYMENT_TYPES = 'cash' | 'card' | 'receivable' | 'golomtCard' | 'mobile';

type Action =
  | { type: 'SET_ACTIVE_PAYMENT'; paymentType: State['activePayment'] }
  | {
      type: 'SET_VALUE';
      value: string | number;
      name: PAYMENT_TYPES;
      remainder: number;
    }
  | { type: 'SET_INIT' };

export const CheckoutContext = React.createContext<State | any>(initialState);

CheckoutContext.displayName = 'CheckoutContext';

const checkoutReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_ACTIVE_PAYMENT': {
      return {
        ...state,
        activePayment: action.paymentType,
      };
    }
    case 'SET_VALUE': {
      const { name, value, remainder } = action;
      const num = parseNum(value);
      return {
        ...state,
        [name]: num >= remainder ? remainder : num,
      };
    }
    case 'SET_INIT': {
      return initialState;
    }
    default:
      return state;
  }
};

export const CheckoutContextProvider: IComponent = ({ children }) => {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);
  const { orderDetail } = useApp();
  const { totalAmount, paidAmounts, cashAmount } = orderDetail || {};

  const remainder =
    (totalAmount || 0) - sumAmount(paidAmounts || []) - (cashAmount || 0);

  const changeActivePayment = useCallback(
    (paymentType: State['activePayment']) =>
      dispatch({ type: 'SET_ACTIVE_PAYMENT', paymentType }),
    [dispatch]
  );
  const setValue = useCallback(
    (value: string | number, name: PAYMENT_TYPES) =>
      dispatch({ type: 'SET_VALUE', value, name, remainder }),
    [dispatch, remainder]
  );
  const setInit = useCallback(() => {
    dispatch({ type: 'SET_INIT' });
  }, [dispatch]);

  const value = useMemo(
    () => ({
      ...state,
      remainder,
      changeActivePayment,
      setValue,
      setInit,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state, remainder]
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckoutContext = () => {
  const context = React.useContext(CheckoutContext);

  if (context === undefined) {
    throw new Error(
      'useCheckoutContext must be used within a CheckoutContextProvider'
    );
  }
  return context;
};
