import React, { useCallback, useMemo, useReducer } from 'react';
import { useApp } from 'modules/AppContext';
import { IComponent } from 'modules/types';
import { parseNum } from 'modules/utils';

export interface State {
  activePayment: string;
  card: number;
}

const initialState = {
  activePayment: '',
  card: 0,
  qpay: 0,
  cash: 0,
  receivable: 0,
};

type PAYMENT_TYPES = 'qpay' | 'cash' | 'card' | 'receivable';

type Action =
  | { type: 'SET_ACTIVE_PAYMENT'; paymentType: State['activePayment'] }
  | {
      type: 'SET_VALUE';
      value: string | number;
      name: PAYMENT_TYPES;
      remainder: number;
    };

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
    default:
      return state;
  }
};

export const CheckoutContextProvider: IComponent = ({ children }) => {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);
  const { orderDetail } = useApp();
  const {
    totalAmount,
    mobileAmount,
    cashAmount,
    cardAmount,
    receivableAmount,
  } = orderDetail || {};

  const remainder =
    (totalAmount || 0) -
    (mobileAmount || 0) -
    (cashAmount || 0) -
    (cardAmount || 0) -
    (receivableAmount || 0);

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

  const value = useMemo(
    () => ({
      ...state,
      remainder,
      changeActivePayment,
      setValue,
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