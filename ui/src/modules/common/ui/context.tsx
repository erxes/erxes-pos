import React, { useCallback, useMemo, useReducer } from 'react';
import { IComponent } from 'modules/types';

export interface State {
  displaySidebar: boolean;
  displayModal: boolean;
  modalView: string;
  sidebarView: string;
}

const initialState = {
  displaySidebar: false,
  displayModal: false,
  modalView: 'EBARIMT_VIEW',
  sidebarView: 'CART_VIEW',
};

type Action =
  | {
      type: 'OPEN_SIDEBAR';
    }
  | {
      type: 'CLOSE_SIDEBAR';
    }
  | {
      type: 'OPEN_MODAL';
    }
  | {
      type: 'CLOSE_MODAL';
    }
  | {
      type: 'SET_MODAL_VIEW';
      view: MODAL_VIEWS;
    }
  | {
      type: 'SET_SIDEBAR_VIEW';
      view: SIDEBAR_VIEWS;
    };

type MODAL_VIEWS = 'EBARIMT_VIEW' | 'HI';

type SIDEBAR_VIEWS = 'CART_VIEW';

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_SIDEBAR':
      return {
        ...state,
        displaySidebar: true,
      };

    case 'CLOSE_SIDEBAR':
      return {
        ...state,
        displaySidebar: false,
      };

    case 'OPEN_MODAL':
      return {
        ...state,
        displayModal: true,
      };

    case 'CLOSE_MODAL':
      return {
        ...state,
        displayModal: false,
      };
    default:
      throw new Error();
  }
}

const UIProvider: IComponent = (props) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const openSidebar = useCallback(
    () => dispatch({ type: 'OPEN_SIDEBAR' }),
    [dispatch]
  );
  const closeSidebar = useCallback(
    () => dispatch({ type: 'CLOSE_SIDEBAR' }),
    [dispatch]
  );
  const openModal = useCallback(
    () => dispatch({ type: 'OPEN_MODAL' }),
    [dispatch]
  );
  const closeModal = useCallback(
    () => dispatch({ type: 'CLOSE_MODAL' }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      ...state,
      openSidebar,
      closeSidebar,
      openModal,
      closeModal,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export default UIProvider;
