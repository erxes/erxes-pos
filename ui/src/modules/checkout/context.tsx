import React, { useCallback, useMemo, useReducer } from 'react';
import { IComponent } from 'modules/types';
import { parseNum } from 'modules/utils';
import useAmounts from 'lib/useAmounts';

export interface State {
  activePayment: string;
  amounts: object;
}

const initialState = {
  activePayment: '',
  amounts: {},
};

type Action =
  | { type: 'SET_ACTIVE_PAYMENT'; paymentType: State['activePayment'] }
  | {
      type: 'SET_VALUE';
      value: string | number;
      name: string;
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
        amounts: {
          ...state.amounts,
          [name]: num >= remainder ? remainder : num,
        },
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
  const { remainder } = useAmounts();

  const changeActivePayment = useCallback(
    (paymentType: string) =>
      dispatch({ type: 'SET_ACTIVE_PAYMENT', paymentType }),
    [dispatch]
  );
  const setValue = useCallback(
    (value: string | number, name: string) =>
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
