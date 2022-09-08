import React, { useCallback, useMemo, useReducer } from 'react';
import { IComponent } from 'modules/types';

export interface State {
  orderDetail: object | null;
  activePayment: string;
}

const initialState = {
  orderDetail: null,
  activePayment: '',
};

type Action =
  | { type: 'SET_ORDER_DETAIL'; data: object | null }
  | { type: 'SET_ACTIVE_PAYMENT'; paymentType: State['activePayment'] };

export const CheckoutContext = React.createContext<State | any>(initialState);

CheckoutContext.displayName = 'CheckoutContext';

const checkoutReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_ORDER_DETAIL': {
      return {
        ...state,
        orderDetail: action.data,
      };
    }
    case 'SET_ACTIVE_PAYMENT': {
      return {
        ...state,
        activePayment: action.paymentType,
      };
    }
    default:
      return state;
  }
};

export const CheckoutContextProvider: IComponent = ({ children }) => {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  const setOrderDetail = useCallback(
    (data: object | null) => dispatch({ type: 'SET_ORDER_DETAIL', data }),
    [dispatch]
  );

  const changeActivePayment = useCallback(
    (paymentType: State['activePayment']) =>
      dispatch({ type: 'SET_ACTIVE_PAYMENT', paymentType }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      ...state,
      setOrderDetail,
      changeActivePayment,
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
