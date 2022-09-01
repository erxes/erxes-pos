import { useEffect, useRef } from 'react';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import Button from 'modules/common/ui/Button';
import CloseFilledCircle from 'modules/common/icons/CloseFilledCircle';

interface SidebarProps {
  children: any;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ children, onClose }) => {
  const sidebarRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const contentRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const onKeyDownSidebar = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.focus();
    }

    const contentElement = contentRef.current;

    if (contentElement) {
      disableBodyScroll(contentElement, { reserveScrollBarGap: true });
    }

    return () => {
      clearAllBodyScrollLocks();
    };
  }, []);

  return (
    <div
      className="sidebar-root"
      ref={sidebarRef}
      onKeyDown={onKeyDownSidebar}
      tabIndex={1}
    >
      <div>
        <div className="sidebar-backdrop" onClick={onClose} />
        <section>
          <div>
            <div className="sidebar" ref={contentRef}>
              <Button
                className="sidebar-close"
                variant="ghost"
                onClick={onClose}
              >
                <CloseFilledCircle />
              </Button>
              {children}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sidebar;
