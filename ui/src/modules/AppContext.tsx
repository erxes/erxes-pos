import React, { useCallback, useMemo, ReactNode, useReducer } from 'react';
import type { IComponent } from './types';

const initialState = {};

export const AppContext = React.createContext<{} | any>(initialState);

AppContext.displayName = 'AppContext';

const appReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'HELLO':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export const AppContextProvider: IComponent = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = useMemo(() => ({}), []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }

  return context;
};
