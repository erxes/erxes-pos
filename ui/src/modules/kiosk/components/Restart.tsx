/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, Suspense, useState } from 'react';
import { useRouter } from 'next/router';
import { useApp } from 'modules/AppContext';
import { getMode } from 'modules/utils';
import dynamic from 'next/dynamic';
import Loading from 'modules/common/ui/Loading';
import dayjs from 'dayjs';

const Modal = dynamic(() => import('ui/Modal'), { suspense: true });
const AskCancel = dynamic(() => import('modules/kiosk/components/AskCancel'));

const Restart = () => {
  const { isChanged } = useApp();
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      setIsModalVisible(true);
    }, 30 * 1000);
  };

  const onMouseMove = () => {
    restartAutoReset();
  };

  useEffect(() => {
    if (getMode() !== 'kiosk' || !isChanged) {
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
  }, [router.pathname, isChanged]);

  return (
    <Suspense fallback={<Loading />}>
      {isModalVisible && (
        <Modal>
          <AskCancel
            goBackToHome={goBackToHome}
            expiryTimestamp={dayjs().add(15, 'seconds')}
            setIsModalVisible={setIsModalVisible}
          />
        </Modal>
      )}
    </Suspense>
  );
};

export default Restart;
