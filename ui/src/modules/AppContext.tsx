import { count } from 'console';
import React, { useCallback, useMemo, ReactNode, useReducer } from 'react';
import type { IComponent, ICartItem, IProductBase } from './types';

export interface State {
  cart: ICartItem[];
}

const initialState = {
  cart: [],
};

type Action =
  | { type: 'ADD_ITEM_TO_CART'; product: IProductBase }
  | { type: 'CHANGE_COUNT'; _id: string; count: number };

export const AppContext = React.createContext<{} | any>(initialState);

AppContext.displayName = 'AppContext';

const appReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_ITEM_TO_CART': {
      const { cart } = state;
      const { product } = action;

      const currentCart = cart.slice();

      const foundItem = currentCart.find(
        (i) => i.productId === product._id && !i.isTake
      );

      if (foundItem) {
        foundItem.count += 1;
      } else {
        const cartItem = {
          ...product,
          _id: Math.random().toString(),
          productId: product._id,
          isTake: false,
          count: 1,
        };
        currentCart.push(cartItem);
      }
      return {
        ...state,
        cart: currentCart,
      };
    }
    case 'CHANGE_COUNT': {
      const { cart } = state;
      const { _id, count } = action;
      const currentCart = cart.slice();

      const foundItem = currentCart.find((item) => item._id === _id);
      if (foundItem) {
        if (count > 0) {
          foundItem.count = count;
          return { ...state, cart: currentCart };
        }
        const index = currentCart.indexOf(foundItem);
        if (index > -1) {
          currentCart.splice(index, 1);
          return { ...state, cart: currentCart };
        }
      }
    }
    default:
      return state;
  }
};

export const AppContextProvider: IComponent = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const mode = 'kiosk';

  const addItemToCart = useCallback(
    (product: IProductBase) => dispatch({ type: 'ADD_ITEM_TO_CART', product }),
    [dispatch]
  );

  const changeItemCount = useCallback(
    (_id: string, count: number) =>
      dispatch({ type: 'CHANGE_COUNT', _id, count }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      ...state,
      mode,
      addItemToCart,
      changeItemCount,
    }),
    [state]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = React.useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }

  return context;
};
