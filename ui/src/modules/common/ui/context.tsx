import React, { useCallback, useMemo, useReducer } from 'react';
import { IComponent } from 'modules/types';

export interface State {
  displaySidebar: boolean;
  displayModal: boolean;
  modalView: string;
  sidebarView: string;
  latestClickedKey: string;
}

const initialState = {
  displaySidebar: false,
  displayModal: false,
  modalView: 'EBARIMT_VIEW',
  sidebarView: 'CART_VIEW',
  sidebarPlacement: 'RIGHT',
  latestClickedKey: '',
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
    }
  | {
      type: 'SET_SIDEBAR_PLACEMENT';
      placement: SIDEBAR_PLACEMENT;
    }
  | {
      type: 'CHANGE_KEY';
      value: string;
    }
  | {
      type: "SET_INIT"
  };

type MODAL_VIEWS =
  | 'EBARIMT_VIEW'
  | 'PAYMENT_VIEW'
  | 'HISTORY_VIEW'
  | 'VISA_VIEW'
  | 'SUCCESS_VIEW'
  | 'MOBILE_VIEW'
  | 'GOLOMT_VIEW';

type SIDEBAR_VIEWS = 'CART_VIEW' | 'KEYBOARD_VIEW';

type SIDEBAR_PLACEMENT = 'RIGHT' | 'BOTTOM';

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

    case 'SET_SIDEBAR_VIEW': {
      return {
        ...state,
        sidebarView: action.view,
      };
    }

    case 'SET_SIDEBAR_PLACEMENT': {
      return {
        ...state,
        sidebarPlacement: action.placement,
      };
    }

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

    case 'SET_MODAL_VIEW':
      return {
        ...state,
        modalView: action.view,
      };

    case 'CHANGE_KEY':
      return {
        ...state,
        latestClickedKey: action.value,
      };
    case 'SET_INIT': {
      return initialState;
    }

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

  const setSidebarView = useCallback(
    (view: SIDEBAR_VIEWS) => dispatch({ type: 'SET_SIDEBAR_VIEW', view }),
    [dispatch]
  );

  const setSidebarPlacement = useCallback(
    (placement: SIDEBAR_PLACEMENT) =>
      dispatch({ type: 'SET_SIDEBAR_PLACEMENT', placement }),
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
  const setModalView = useCallback(
    (view: MODAL_VIEWS) => dispatch({ type: 'SET_MODAL_VIEW', view }),
    [dispatch]
  );

  const changeKey = useCallback(
    (value: string) => dispatch({ type: 'CHANGE_KEY', value }),
    [dispatch]
  );

  const setInit = useCallback(() => dispatch({ type: 'SET_INIT' }), [dispatch]);

  const value = useMemo(
    () => ({
      ...state,
      openSidebar,
      closeSidebar,
      setSidebarView,
      setSidebarPlacement,
      openModal,
      closeModal,
      setModalView,
      changeKey,
      setInit
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
