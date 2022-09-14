import type { FC } from 'react';
import type { IEbarimt } from '../../types';
import Button from 'ui/Button';
import ICInput from 'ui/ICInput';

const Ebarimt: FC<IEbarimt> = ({ type, setType }) => {
  if (type === 'organization') {
    return (
      <div className="ebarimt-kiosk-org text-center">
        <h2>
          Байгууллагын РД <br /> оруулна уу.
        </h2>
        <ICInput handleOutputString={(str: any) => console.log(str)} />
        <Button disabled>
          <h4>Шалгах</h4>
        </Button>
      </div>
    );
  }

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
