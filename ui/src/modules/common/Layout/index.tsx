import type { IComponent } from 'modules/types';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Loading from 'ui/Loading';
import { useUI } from 'ui/context';
import { getMode } from 'modules/utils';

const EbarimtView = dynamic(
  () => import('modules/checkout/containers/Ebarimt'),
  { suspense: true }
);

const PaymentView = dynamic(
  () => import('modules/checkout/containers/Payment')
);

const CheckoutContextProvider = dynamic(
  () =>
    import('modules/checkout/context').then(
      (mod) => mod.CheckoutContextProvider
    ),
  {
    suspense: true,
  }
);

const CartView = dynamic(() => import('modules/kiosk/components/Cart'), {
  suspense: true,
});

const KeyboardView = dynamic(
  () => import('modules/checkout/components/KeyBoard')
);

const Modal = dynamic(() => import('ui/Modal'), {
  suspense: true,
});

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
          {modalView === 'PAYMENT_VIEW' && (
            <CheckoutContextProvider>
              <PaymentView />
            </CheckoutContextProvider>
          )}
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
      <Sidebar onClose={closeSidebar}>
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
    <ModalView
      modalView={modalView}
      closeModal={getMode() === 'kiosk' ? () => null : closeModal}
    />
  ) : null;
};

const SidebarUI: React.FC = () => {
  const { displaySidebar, sidebarView, closeSidebar } = useUI();
  return displaySidebar ? (
    <SidebarView
      sidebarView={sidebarView}
      closeSidebar={getMode() === 'kiosk' ? () => null : closeSidebar}
    />
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
