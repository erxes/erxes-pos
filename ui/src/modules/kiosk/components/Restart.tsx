import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useApp } from 'modules/AppContext';
import { getMode } from '../../utils';

const Restart = () => {
  const { setInitialState } = useApp();
  const router = useRouter();
  let timeout: NodeJS.Timeout | null = null;

  const goBackToHome = () => {
    // code to reset the application
    window.location.href = '/';
  };

  const restartAutoReset = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      goBackToHome();
    }, 1000 * 60);
  };

  const onMouseMove = () => {
    console.log('money moves');
    restartAutoReset();
  };

  useEffect(() => {
    if (getMode() !== 'kiosk') {
      return;
    }

    // initiate timeout
    restartAutoReset();

    // listen for mouse events
    window.addEventListener('mousemove', onMouseMove);

    // cleanup
    return () => {
      if (timeout) {
        clearTimeout(timeout);
        window.removeEventListener('mousemove', onMouseMove);
      }
    };
  }, [router.pathname]);

  return <div />;
};

export default Restart;
