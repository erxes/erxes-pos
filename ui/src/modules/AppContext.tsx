import {
  useCallback,
  useMemo,
  useReducer,
  useContext,
  createContext,
} from 'react';
import type { IComponent, ICartItem, IProductBase } from './types';

export interface State {
  cart: ICartItem[];
  isCartSelected: boolean;
  isTake: '' | 'eat' | 'take' | string;
  orderDetail: object | null;
  registerNumber: string;
  companyName: string;
  billType: TBillType;
}

const initialState = {
  isCartSelected: false,
  cart: [],
  isTake: '',
  orderDetail: null,
  registerNumber: '',
  companyName: '',
  billType: '',
};

type TBillType = '' | '1' | '3' | string;

type Action =
  | {
      type: 'ADD_ITEM_TO_CART';
      product: IProductBase & { productImgUrl: string };
    }
  | { type: 'CHANGE_COUNT'; _id: string; count: number }
  | { type: 'SELECT'; _id: string }
  | { type: 'SELECT_ALL' }
  | { type: 'DELIVERY' }
  | { type: 'SET_CART'; cart: ICartItem[] }
  | {
      type: 'SET_IS_TAKE';
      value: State['isTake'];
    }
  | { type: 'SET_ORDER_DETAIL'; data: object | null }
  | { type: 'SET_REGISTER_NUMBER'; value: string }
  | { type: 'SET_COMPANY_NAME'; value: string }
  | { type: 'SET_BILL_TYPE'; value: TBillType };

export const AppContext = createContext<{} | any>(initialState);

AppContext.displayName = 'AppContext';

const appReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_ITEM_TO_CART': {
      const { cart } = state;
      const { product } = action;

      const currentCart = cart.slice();

      const foundItem = currentCart.find(
        (i) => i.productId === product._id && !i.isTake && i.status === 'new'
      );

      if (foundItem) {
        foundItem.count += 1;
      } else {
        const cartItem = {
          ...product,
          _id: Math.random().toString(),
          productId: product._id,
          isTake: state.isTake === 'take',
          count: 1,
          isSelected: false,
          status: 'new',
        };
        currentCart.push(cartItem);
      }
      return {
        ...state,
        cart: currentCart,
      };
    }
    case 'CHANGE_COUNT': {
      const { cart, isCartSelected } = state;
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
          return {
            ...state,
            cart: currentCart,
            isCartSelected: currentCart.length === 0 ? false : isCartSelected,
          };
        }
      }
    }
    case 'SELECT': {
      const { cart } = state;
      const { _id } = action;
      const currentCart = cart.slice();
      const foundItem = currentCart.find((item) => item._id === _id);
      if (foundItem) {
        foundItem.isSelected = !foundItem.isSelected;
        return { ...state, cart: currentCart };
      }
    }
    case 'SELECT_ALL': {
      const { cart, isCartSelected } = state;

      if (cart.length === 0) return { ...state, isCartSelected: false };

      const newCart = cart.map((item) => ({
        ...item,
        isSelected: !isCartSelected,
      }));
      return { ...state, cart: newCart, isCartSelected: !isCartSelected };
    }
    case 'DELIVERY': {
      const { cart } = state;
      const newCart = cart.map((item) => ({
        ...item,
        isTake: item.isSelected,
        isSelected: false,
      }));
      return {
        ...state,
        cart: newCart,
      };
    }
    case 'SET_CART': {
      return {
        ...state,
        cart: action.cart,
      };
    }
    case 'SET_IS_TAKE': {
      return {
        ...state,
        isTake: action.value,
      };
    }
    case 'SET_ORDER_DETAIL': {
      return {
        ...state,
        orderDetail: action.data,
      };
    }
    case 'SET_REGISTER_NUMBER': {
      return {
        ...state,
        registerNumber: action.value,
      };
    }
    case 'SET_COMPANY_NAME': {
      return {
        ...state,
        companyName: action.value,
      };
    }
    case 'SET_BILL_TYPE': {
      return {
        ...state,
        billType: action.value,
      };
    }
    default:
      return state;
  }
};

export const AppContextProvider: IComponent = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addItemToCart = useCallback(
    (product: IProductBase & { productImgUrl: string }) =>
      dispatch({ type: 'ADD_ITEM_TO_CART', product }),
    [dispatch]
  );

  const changeItemCount = useCallback(
    (_id: string, count: number) =>
      dispatch({ type: 'CHANGE_COUNT', _id, count }),
    [dispatch]
  );

  const selectItem = useCallback(
    (_id: string) => dispatch({ type: 'SELECT', _id }),
    [dispatch]
  );

  const selectAll = useCallback(
    () => dispatch({ type: 'SELECT_ALL' }),
    [dispatch]
  );

  const delivery = useCallback(
    () => dispatch({ type: 'DELIVERY' }),
    [dispatch]
  );
  const setCart = useCallback(
    (cart: ICartItem[]) => dispatch({ type: 'SET_CART', cart }),
    [dispatch]
  );

  const setIsTake = useCallback(
    (value: State['isTake']) => dispatch({ type: 'SET_IS_TAKE', value }),
    [dispatch]
  );
  const setOrderDetail = useCallback(
    (data: object | null) => dispatch({ type: 'SET_ORDER_DETAIL', data }),
    [dispatch]
  );

  const setRegisterNumber = useCallback(
    (value: string) => dispatch({ type: 'SET_REGISTER_NUMBER', value }),
    [dispatch]
  );

  const setCompanyName = useCallback(
    (value: string) => dispatch({ type: 'SET_COMPANY_NAME', value }),
    [dispatch]
  );

  const setBillType = useCallback(
    (value: TBillType) => dispatch({ type: 'SET_BILL_TYPE', value }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      ...state,
      addItemToCart,
      changeItemCount,
      selectItem,
      selectAll,
      delivery,
      setCart,
      setIsTake,
      setOrderDetail,
      setRegisterNumber,
      setCompanyName,
      setBillType,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }

  return context;
};
