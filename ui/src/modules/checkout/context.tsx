import React, { useCallback, useMemo, useReducer } from 'react';
import { IComponent } from 'modules/types';

export interface State {
  activePayment: string;
  remainder: number;
  card: number;
}

const initialState = {
  activePayment: '',
  remainder: 0,
  card: 0,
};

type Action =
  | { type: 'SET_ACTIVE_PAYMENT'; paymentType: State['activePayment'] }
  | { type: 'SET_REMAINDER'; value: number }
  | { type: 'SET_CARD_VALUE'; value: string | number };

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
    case 'SET_CARD_VALUE': {
      const { value } = action;
      const { remainder } = state;
      const str = value.toString();
      const num = str.length > 0 ? parseFloat(str.replaceAll(' ', '')) : 0;
      return {
        ...state,
        card: num >= remainder ? remainder : num,
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
  const setCardValue = useCallback(
    (value: string | number) => dispatch({ type: 'SET_CARD_VALUE', value }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      ...state,
      changeActivePayment,
      setRemainder,
      setCardValue,
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
