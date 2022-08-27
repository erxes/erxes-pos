import { FC, useRef, useEffect, useCallback } from 'react';
import FocusTrap from 'lib/focus-trap';
import Close from 'icons/CloseCircle';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import Button from '../Button';

interface ModalProps {
  className?: string;
  children?: any;
  onClose: () => void;
  onEnter?: () => void | null;
}

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        return onClose();
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

  return (
    <div className="modal-root flex-center">
      <div className="modal" role="dialog" ref={ref}>
        <Button
          onClick={() => onClose()}
          aria-label="Close panel"
          className="modal-close"
          variant="ghost"
        >
          <Close />
        </Button>
        <FocusTrap focusFirst>{children}</FocusTrap>
      </div>
    </div>
  );
};

export default Modal;
