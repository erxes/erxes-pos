import type { IComponent } from 'modules/types';
import { useRouter } from 'next/router';
import MainLayout from '../Layout';
import Button from 'modules/common/ui/Button';
import CloseCircle from 'modules/common/icons/CloseCircle';

const BlackLayout: IComponent = ({ children }) => {
  const router = useRouter();
  return (
    <MainLayout>
      <div className="flex-center blck-layout">
        <Button variant="ghost" onClick={() => (window.location.href = '/')}>
          <CloseCircle />
        </Button>
        {children}
      </div>
    </MainLayout>
  );
};

export default BlackLayout;
