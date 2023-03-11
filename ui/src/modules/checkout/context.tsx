import React, { useCallback, useMemo, useReducer } from 'react';
import { IComponent } from 'modules/types';
import useAmounts from 'lib/useAmounts';

export interface State {
  activePayment: string;
  amounts: object;
  oddMoney: number;
}

const initialState = {
  activePayment: '',
  amounts: {},
  oddMoney: 0,
};

type Action =
  | { type: 'SET_ACTIVE_PAYMENT'; paymentType: State['activePayment'] }
  | {
      type: 'SET_VALUE';
      value: number;
      name: string;
    }
  | { type: 'SET_INIT' }
  | { type: 'SET_ODD_MONEY'; oddMoney: number };

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
      const { name, value } = action;
      return {
        ...state,
        amounts: {
          ...state.amounts,
          [name]: value,
        },
      };
    }
    case 'SET_INIT': {
      return initialState;
    }
    case 'SET_ODD_MONEY': {
      return {
        ...state,
        oddMoney: action.oddMoney,
      };
    }
    default:
      return state;
  }
};

export const CheckoutContextProvider: IComponent = ({ children }) => {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);
  const { remainder, validateAmount } = useAmounts();

  const changeActivePayment = useCallback(
    (paymentType: string) =>
      dispatch({ type: 'SET_ACTIVE_PAYMENT', paymentType }),
    [dispatch]
  );
  const setValue = useCallback(
    (value: string | number, name: string) =>
      dispatch({
        type: 'SET_VALUE',
        value: validateAmount(value, name),
        name,
      }),
    [dispatch, validateAmount]
  );

  const setOddMoney = useCallback(
    (oddMoney: number) => dispatch({ type: 'SET_ODD_MONEY', oddMoney }),
    [dispatch]
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
      setOddMoney,
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
