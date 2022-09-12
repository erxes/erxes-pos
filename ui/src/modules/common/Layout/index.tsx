import type { IComponent } from 'modules/types';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Loading from 'ui/Loading';
import { useUI } from '../ui/context';

const EbarimtView = dynamic(
  () => import('modules/checkout/containers/Ebarimt'),
  { suspense: true }
);

const Modal = dynamic(() => import('modules/common/ui/Modal'), {
  suspense: true,
});

const ModalView: React.FC<{ modalView: string; closeModal(): any }> = ({
  modalView,
  closeModal,
}) => {
  return (
    <Suspense fallback={<Loading />}>
      <Modal onClose={closeModal}>
        <Suspense fallback={<Loading />}>
          {modalView === 'EBARIMT_VIEW' && <EbarimtView />}
        </Suspense>
      </Modal>
    </Suspense>
  );
};

const ModalUI: React.FC = () => {
  const { displayModal, modalView, closeModal } = useUI();
  return displayModal ? (
    <ModalView modalView={modalView} closeModal={closeModal} />
  ) : null;
};

const MainLayout: IComponent = ({ children }) => {
  return (
    <>
      {children}
      <ModalUI />
    </>
  );
};

export default MainLayout;
