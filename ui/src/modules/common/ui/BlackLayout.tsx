import type { IComponent } from 'modules/types';
import { useRouter } from 'next/router';
import { useCheckoutContext } from 'modules/checkout/context';
import MainLayout from '../Layout';
import Button from 'modules/common/ui/Button';
import CloseCircle from 'modules/common/icons/CloseCircle';

const BlackLayout: IComponent = ({ children }) => {
  const router = useRouter();
  const { setInit } = useCheckoutContext();

  const handleClose = () => {
    if (router.pathname === '/settings') return (window.location.href = '/');
    if (router.pathname === '/checkout/[orderId]') {
      router.push({
        pathname: '/',
        query: { orderId: router.query.orderId },
      });
      setInit();
      return;
    }
  };

  return (
    <MainLayout>
      <div className="flex-center blck-layout">
        <Button variant="ghost" onClick={handleClose}>
          <CloseCircle />
        </Button>
        {children}
      </div>
    </MainLayout>
  );
};

export default BlackLayout;
