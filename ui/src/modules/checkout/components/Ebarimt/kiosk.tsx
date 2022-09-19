import { FC, useState, useEffect } from 'react';
import type { IEbarimt } from '../../types';
import { useUI } from 'ui/context';
import { useApp } from 'modules/AppContext';
import useOrderCU from 'lib/useOrderCU';
import Button from 'ui/Button';
import ICInput from 'ui/ICInput';
import CheckRegister from 'modules/checkout/containers/CheckRegister';
import cn from 'classnames';

const Ebarimt: FC<IEbarimt> = ({ type, setType }) => {
  const {
    setSidebarView,
    setSidebarPlacement,
    openSidebar,
    closeSidebar,
    setModalView,
  } = useUI();
  const { registerNumber, setRegisterNumber } = useApp();
  const [name, setName] = useState('');

  const onCompleted = () => {
    setModalView('PAYMENT_VIEW');
  };
  const { orderCU, loading } = useOrderCU(onCompleted);

  const disabled = registerNumber.length !== 7;

  useEffect(() => {
    if (type === 'organization') {
      setSidebarView('KEYBOARD_VIEW');
      setSidebarPlacement('BOTTOM');
      openSidebar();
    }
    return closeSidebar;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    setName('');
  }, [registerNumber]);

  const handleGoToPayment = () => {
    return orderCU();
  };

  const renderStatus = () => {
    return (
      registerNumber.length === 7 && (
        <h3 className={cn('status', name ? 'success' : 'error')}>
          {name ? name : 'Байгууллага олдсонгүй'}
        </h3>
      )
    );
  };

  if (type === 'organization') {
    return (
      <div className="modal-kiosk text-center ebarimt-kiosk">
        <h2>
          Байгууллагын РД <br /> оруулна уу.
        </h2>
        <ICInput handleOutputString={(str: string) => setRegisterNumber(str)} />

        {renderStatus()}

        {name && !disabled ? (
          <Button onClick={handleGoToPayment} loading={loading}>
            <h4>Төлбөр төлөх</h4>
          </Button>
        ) : (
          <CheckRegister setName={setName} />
        )}
      </div>
    );
  }

  return (
    <div className="ebarimt-kiosk modal-kiosk ">
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
