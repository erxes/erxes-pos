import React, { useCallback, useMemo, useReducer } from 'react';
import { IComponent } from 'modules/types';
import { parseNum } from 'modules/utils';

export interface State {
  activePayment: string;
  remainder: number;
  card: number;
}

const initialState = {
  activePayment: '',
  remainder: 0,
  card: 0,
  qpay: 0,
  cash: 0,
};

type PAYMENT_TYPES = 'qpay' | 'cash' | 'card';

type Action =
  | { type: 'SET_ACTIVE_PAYMENT'; paymentType: State['activePayment'] }
  | { type: 'SET_REMAINDER'; value: number }
  | { type: 'SET_VALUE'; value: string | number; name: PAYMENT_TYPES };

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
    case 'SET_REMAINDER': {
      return {
        ...state,
        remainder: action.value,
      };
    }
    case 'SET_VALUE': {
      const { remainder } = state;
      const { name, value } = action;
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

  const changeActivePayment = useCallback(
    (paymentType: State['activePayment']) =>
      dispatch({ type: 'SET_ACTIVE_PAYMENT', paymentType }),
    [dispatch]
  );
  const setRemainder = useCallback(
    (value: number) => dispatch({ type: 'SET_REMAINDER', value }),
    [dispatch]
  );
  const setValue = useCallback(
    (value: string | number, name: PAYMENT_TYPES) =>
      dispatch({ type: 'SET_VALUE', value, name }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      ...state,
      changeActivePayment,
      setRemainder,
      setValue,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
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
