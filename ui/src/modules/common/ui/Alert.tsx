import { useState } from 'react';
import cn from 'classnames';

const initialState = {
  message: '',
  type: 'success',
};

const useAlert = (Component: any = 'div') => {
  const [alert, setAlert] = useState(initialState);

  const onAlert = (message: string, type?: string) => {
    setAlert({ message, type: type || initialState.type });
    return setTimeout(() => setAlert(initialState), 5000);
  };

  const Alert = () => (
    <Component
      className={cn('smooth', 'alert', alert.type, { active: alert.message })}
    >
      {alert.message}
    </Component>
  );

  return { onAlert, Alert };
};

export default useAlert;
