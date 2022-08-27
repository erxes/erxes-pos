import type { IComponent } from 'modules/types';
import { useRouter } from 'next/router';
import Button from 'ui/Button';
import CloseCircle from 'icons/CloseCircle';

const BlackLayout: IComponent = ({ children }) => {
  const router = useRouter();
  return (
    <div className="flex-center blck-layout">
      <Button variant="ghost" onClick={() => router.back()}>
        <CloseCircle />
      </Button>
      {children}
    </div>
  );
};

export default BlackLayout;
