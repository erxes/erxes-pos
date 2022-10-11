import { FC, useRef, useEffect, useCallback } from 'react';
import FocusTrap from 'lib/focus-trap';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import Button from '../Button';
import Xmark from 'modules/common/icons/Xmark';
import { useUI } from 'ui/context';
import cn from 'classnames';
import { getMode } from 'modules/utils';

interface ModalProps {
  className?: string;
  children?: any;
  onClose?: () => void;
  onEnter?: () => void | null;
}

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const mode = getMode();
  const { displaySidebar, sidebarPlacement, modalView } = useUI();

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        return onClose && onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const modal = ref.current;

    if (modal) {
      disableBodyScroll(modal, { reserveScrollBarGap: true });
      window.addEventListener('keydown', handleKey);
    }
    return () => {
      clearAllBodyScrollLocks();
      window.removeEventListener('keydown', handleKey);
    };
  }, [handleKey]);

  const rootCn = cn(
    'modal-root flex-center',
    {
      '-dark':
        mode === 'kiosk' ||
        modalView === 'QPAY_LIST_VIEW' ||
        modalView === 'QPAY_VIEW',
    },
    displaySidebar &&
      sidebarPlacement === 'BOTTOM' &&
      (mode === 'pos' ? 'poswsbar' : 'wsbar')
  );

  return (
    <div className={rootCn}>
      <div className="modal" role="dialog" ref={ref}>
        {(mode === 'pos' || modalView === 'EBARIMT_VIEW') && onClose && (
          <Button
            onClick={() => onClose()}
            aria-label="Close panel"
            className="modal-close"
            variant="ghost"
          >
            <Xmark />
          </Button>
        )}
        <FocusTrap focusFirst>{children}</FocusTrap>
      </div>
    </div>
  );
};

export default Modal;
