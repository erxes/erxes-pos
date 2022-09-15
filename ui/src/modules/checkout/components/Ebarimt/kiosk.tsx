import { FC, useState } from 'react';
import type { IEbarimt } from '../../types';
import { useUI } from 'ui/context';
import Button from 'ui/Button';
import ICInput from 'ui/ICInput';

const Ebarimt: FC<IEbarimt> = ({
  type,
  setType,
  loading,
  data,
  checkRegister,
}) => {
  const { setSidebarView, setSidebarPlacement, openSidebar } = useUI();
  const [value, setValue] = useState('');
  const handleFocus = () => {
    setSidebarView('KEYBOARD_VIEW');
    setSidebarPlacement('BOTTOM');
    openSidebar();
  };

  if (type === 'organization') {
    return (
      <div className="ebarimt-kiosk-org text-center" onMouseDown={handleFocus}>
        <h2>
          Байгууллагын РД <br /> оруулна уу.
        </h2>
        <ICInput handleOutputString={(str: string) => setValue(str)} />

        {data && <div>{data.ordersCheckCompany.name}</div>}
        <Button
          disabled={value.length !== 7}
          loading={loading}
          onClick={() =>
            checkRegister({
              variables: {
                registerNumber: value,
              },
            })
          }
        >
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
