import type { FC } from 'react';
import type { IEbarimt } from '../../types';
import Button from 'ui/Button';

const Ebarimt: FC<IEbarimt> = ({ type, setType }) => {
  return (
    <div className="ebarimt-kiosk">
      <h2>
        Та баримтын төрлөө <br /> сонгоно уу!
      </h2>
      <Button
        variant="slim"
        Component="h4"
        onClick={() => setType('individual')}
      >
        Хувь хүнээр
      </Button>
      <Button
        variant="slim"
        Component="h4"
        onClick={() => setType('organization')}
      >
        Байгууллагаар
      </Button>
    </div>
  );
};

export default Ebarimt;
