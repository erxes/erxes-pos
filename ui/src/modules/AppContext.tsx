import {
  useCallback,
  useMemo,
  useReducer,
  useContext,
  createContext,
} from 'react';
import type { IComponent, ICartItem, IProductBase } from './types';
import { getLocal } from './utils';

export interface State {
  cart: ICartItem[];
  type: 'delivery' | 'eat' | 'take' | string;
  orderDetail: object | null;
  registerNumber: string;
  companyName: string;
  billType: TBillType;
  slotCode: string;
  customerId: string;
  customerType: string;
  description: string;
  isChanged: boolean;
  searchValue: string;
  foundItem: ICartItem | null;
  isBarcode: boolean;
}

const initialState = {
  cart: getLocal('cart') || [],
  type: getLocal('defaultType'),
  orderDetail: null,
  registerNumber: '',
  companyName: '',
  billType: '',
  customerId: '',
  customerType: '',
  description: '',
  isChanged: false,
  slotCode: '',
  searchValue: '',
  foundItem: null,
  isBarcode: false,
};

type TBillType = '' | '1' | '3' | string;

type Action =
  | {
    type: 'ADD_ITEM_TO_CART';
    product: IProductBase & {
      productImgUrl: string;
      manufacturedDate?: string;
    };
  }
  | { type: 'SELECT'; _id: string }
  | { type: 'SET_CART'; cart: ICartItem[] }
  | { type: 'SET_TYPE'; value: string }
  | { type: 'SET_ORDER_DETAIL'; data: object | null }
  | { type: 'SET_REGISTER_NUMBER'; value: string }
  | { type: 'SET_COMPANY_NAME'; value: string }
  | { type: 'SET_BILL_TYPE'; value: TBillType }
  | { type: 'SET_CUSTOMER_ID'; value: string }
  | { type: 'SET_CUSTOMER_TYPE'; value: string }
  | { type: 'CHANGE_COUNT'; _id: string; count: number }
  | { type: 'SET_DESCRIPTION'; value: string }
  | { type: 'SET_INITIAL_STATE' }
  | { type: 'CHANGE_IS_CHANGED'; value: boolean }
  | { type: 'SET_SLOT_CODE'; value: string }
  | { type: 'SET_SEARCH'; value: string }
  | { type: 'CHANGE_FOUND_ITEM'; value: ICartItem }
  | { type: 'CHANGE_IS_BARCODE'; value: boolean };

export const AppContext = createContext<{} | any>(initialState);

AppContext.displayName = 'AppContext';

const appReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CHANGE_IS_BARCODE': {
      return { ...state, isBarcode: action.value };
    }
    case 'CHANGE_FOUND_ITEM': {
      return { ...state, foundItem: action.value };
    }
    case 'SET_SEARCH': {
      return {
        ...state,
        searchValue: action.value,
      };
    }
    case 'ADD_ITEM_TO_CART': {
      const { cart } = state;
      const { product } = action;

      const currentCart = cart.slice();

      const foundItem = currentCart.find((i) => {
        if (i.productId === product._id && i.status === 'new' && i.manufacturedDate === product.manufacturedDate) {
          if (state.type === ('take' || 'delivery')) return true;
          if (!i.isTake) return true;
        }
      });

      if (foundItem) {
        foundItem.count += 1;
        currentCart.splice(currentCart.indexOf(foundItem), 1)
        currentCart.unshift(foundItem)
      } else {
        const cartItem = {
          ...product,
          _id: Math.random().toString(),
          productId: product._id,
          isTake: state.type === ('take' || 'delivery'),
          count: 1,
          status: 'new',
        };
        currentCart.unshift(cartItem);
      }

      return {
        ...state,
        cart: currentCart,
      };
    }
    case 'CHANGE_IS_CHANGED': {
      return {
        ...state,
        isChanged: action.value,
      };
    }
    case 'SET_TYPE': {
      const { cart } = state;
      const newCart = cart.map((item) => ({
        ...item,
        isTake: action.value !== 'eat',
      }));
      return {
        ...state,
        cart: newCart,
        type: action.value,
      };
    }

    case 'SET_CART': {
      return {
        ...state,
        cart: action.cart,
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
    case 'SET_CUSTOMER_ID': {
      return {
        ...state,
        customerId: action.value,
      };
    }
    case 'SET_CUSTOMER_TYPE': {
      return {
        ...state,
        customerType: action.value,
      };
    }
    case 'SET_DESCRIPTION': {
      return {
        ...state,
        description: action.value,
      };
    }
    case 'SET_SLOT_CODE': {
      return {
        ...state,
        slotCode: action.value,
      };
    }
    case 'SET_INITIAL_STATE': {
      return { ...initialState, cart: [] };
    }
    case 'CHANGE_COUNT': {
      const { cart } = state;
      const { _id, count } = action;
      const currentCart = cart.slice();

      const foundItem = currentCart.find((item) => item._id === _id);
      if (foundItem) {
        if (count < 0) {
          const index = currentCart.indexOf(foundItem);
          currentCart.splice(index, 1);
          return {
            ...state,
            cart: currentCart,
          };
        }
        foundItem.count = count;
        return { ...state, cart: currentCart };
      }
    }

    case 'SELECT': {
      const { cart } = state;
      const { _id } = action;
      const currentCart = cart.slice();
      const foundItem = currentCart.find((item) => item._id === _id);
      if (foundItem) {
        foundItem.isTake = !foundItem.isTake;
        return { ...state, cart: currentCart };
      }
    }

    default:
      return state;
  }
};

export const AppContextProvider: IComponent = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addItemToCart = useCallback(
    (
      product: IProductBase & {
        productImgUrl: string;
        manufacturedDate?: string;
      }
    ) => dispatch({ type: 'ADD_ITEM_TO_CART', product }),
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

  const setCart = useCallback(
    (cart: ICartItem[]) => dispatch({ type: 'SET_CART', cart }),
    [dispatch]
  );

  const setType = useCallback(
    (value: string) => {
      dispatch({ type: 'SET_TYPE', value });
    },
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

  const setCustomerId = useCallback(
    (value: string) => dispatch({ type: 'SET_CUSTOMER_ID', value }),
    [dispatch]
  );

  const setCustomerType = useCallback(
    (value: string) => dispatch({ type: 'SET_CUSTOMER_TYPE', value }),
    [dispatch]
  );

  const setDescription = useCallback(
    (value: string) => dispatch({ type: 'SET_DESCRIPTION', value }),
    [dispatch]
  );

  const setInitialState = useCallback(
    () => dispatch({ type: 'SET_INITIAL_STATE' }),
    [dispatch]
  );

  const changeIsChanged = useCallback(
    (value: boolean) => dispatch({ type: 'CHANGE_IS_CHANGED', value }),
    [dispatch]
  );

  const setSlotCode = useCallback(
    (value: string) => dispatch({ type: 'SET_SLOT_CODE', value }),
    [dispatch]
  );

  const setSearch = useCallback(
    (value: string) => dispatch({ type: 'SET_SEARCH', value }),
    [dispatch]
  );

  const changeFoundItem = useCallback(
    (value: ICartItem) => dispatch({ type: 'CHANGE_FOUND_ITEM', value }),
    [dispatch]
  );

  const changeIsBarcode = useCallback(
    (value: boolean) => dispatch({ type: 'CHANGE_IS_BARCODE', value }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      ...state,
      addItemToCart,
      changeItemCount,
      selectItem,
      setCart,
      setType,
      setOrderDetail,
      setRegisterNumber,
      setCompanyName,
      setBillType,
      setCustomerId,
      setCustomerType,
      setDescription,
      setInitialState,
      changeIsChanged,
      setSlotCode,
      setSearch,
      changeFoundItem,
      changeIsBarcode,
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
