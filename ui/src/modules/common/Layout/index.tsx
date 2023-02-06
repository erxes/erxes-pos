import type { IComponent } from 'modules/types';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Loading from 'ui/Loading';
import { useUI } from 'ui/context';

const EbarimtView = dynamic(
  () => import('modules/checkout/containers/Ebarimt'),
  { suspense: true }
);

const PaymentView = dynamic(() => import('modules/kiosk/components/Payment'), {
  suspense: true,
});

const HistoryView = dynamic(() => import('modules/history/components/Detail'), {
  suspense: true,
});

const VisaView = dynamic(
  () => import('modules/checkout/containers/card/Card'),
  { suspense: true }
);

const GolomtView = dynamic(
  () => import('modules/checkout/containers/golomtCard/Golomt'),
  { suspense: true }
);

const SuccessView = dynamic(() => import('modules/kiosk/containers/success'), {
  suspense: true,
});

const Modal = dynamic(() => import('ui/Modal'), {
  suspense: true,
});

const CartView = dynamic(() => import('modules/kiosk/components/Cart'), {
  suspense: true,
});

const KeyboardView = dynamic(
  () => import('modules/checkout/components/KeyBoard'),
  {
    suspense: true,
  }
);

const MobileView = dynamic(
  () => import('modules/checkout/containers/mobile/MobileContainer'),
  {
    suspense: true,
  }
);

const Sidebar = dynamic(() => import('ui/SideBar'), { suspense: true });

const ModalView: React.FC<{ modalView: string; closeModal: any }> = ({
  modalView,
  closeModal,
}) => {
  return (
    <Suspense fallback={<Loading />}>
      <Modal onClose={closeModal}>
        <Suspense fallback={<Loading />}>
          {modalView === 'EBARIMT_VIEW' && <EbarimtView />}
          {modalView === 'PAYMENT_VIEW' && <PaymentView />}
          {modalView === 'HISTORY_VIEW' && <HistoryView />}
          {modalView === 'VISA_VIEW' && <VisaView />}
          {modalView === 'SUCCESS_VIEW' && <SuccessView />}
          {modalView === 'MOBILE_VIEW' && <MobileView />}
          {modalView === 'GOLOMT_VIEW' && <GolomtView />}
        </Suspense>
      </Modal>
    </Suspense>
  );
};

const SidebarView: React.FC<{ sidebarView: string; closeSidebar: any }> = ({
  sidebarView,
  closeSidebar,
}) => {
  return (
    <Suspense fallback={<Loading />}>
      <Sidebar onClose={sidebarView === 'CART_VIEW' ? closeSidebar : null}>
        <Suspense fallback={<Loading />}>
          {sidebarView === 'CART_VIEW' && <CartView />}
          {sidebarView === 'KEYBOARD_VIEW' && <KeyboardView touch />}
        </Suspense>
      </Sidebar>
    </Suspense>
  );
};

const ModalUI: React.FC = () => {
  const { displayModal, modalView, closeModal } = useUI();
  return displayModal ? (
    <ModalView modalView={modalView} closeModal={closeModal} />
  ) : null;
};

const SidebarUI: React.FC = () => {
  const { displaySidebar, sidebarView, closeSidebar } = useUI();
  return displaySidebar ? (
    <SidebarView sidebarView={sidebarView} closeSidebar={closeSidebar} />
  ) : null;
};

const MainLayout: IComponent = ({ children }) => {
  return (
    <>
      {children}
      <ModalUI />
      <SidebarUI />
    </>
  );
};

export default MainLayout;
