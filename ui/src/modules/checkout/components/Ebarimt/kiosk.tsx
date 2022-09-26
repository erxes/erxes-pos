import { useEffect } from 'react';
import { useUI } from 'ui/context';
import { useApp } from 'modules/AppContext';
import useBillType from 'lib/useBillType';
import useOrderCU from 'lib/useOrderCU';
import Button from 'ui/Button';
import ICInput from 'ui/ICInput';
import useCheckRegister from 'lib/useCheckRegister';

const Ebarimt = () => {
  const {
    setSidebarView,
    setSidebarPlacement,
    openSidebar,
    closeSidebar,
    setModalView,
  } = useUI();
  const { registerNumber, setRegisterNumber, billType } = useApp();
  const { loading: checking, checkRegister, name, error } = useCheckRegister();
  const { isOrg, chooseOrg, choosePrsn } = useBillType();

  const onCompleted = () => {
    setModalView('PAYMENT_VIEW');
  };
  const { orderCU, loading } = useOrderCU(onCompleted);

  const disabled = registerNumber.length !== 7;

  useEffect(() => {
    if (isOrg) {
      setSidebarView('KEYBOARD_VIEW');
      setSidebarPlacement('BOTTOM');
      openSidebar();
    }
    return closeSidebar;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billType]);

  const handleGoToPayment = () => orderCU();

  const renderStatus = () => {
    if (error) return <h3 className="status error">{error.message}</h3>;

    if (name) return <h3 className="status success">{name}</h3>;
  };

  if (isOrg)
    return (
      <div className="modal-kiosk text-center ebarimt-kiosk">
        <h2>
          Байгууллагын РД <br /> оруулна уу.
        </h2>
        <ICInput handleOutputString={(str: string) => setRegisterNumber(str)} />

        {renderStatus()}

        {name ? (
          <Button onClick={handleGoToPayment} loading={loading}>
            <h4>Төлбөр төлөх</h4>
          </Button>
        ) : (
          <Button
            disabled={disabled}
            loading={!disabled && checking}
            onClick={checkRegister}
            className="ebarimt-kiosk-check"
          >
            <h4>Шалгах</h4>
          </Button>
        )}
      </div>
    );

  return (
    <div className="ebarimt-kiosk modal-kiosk ">
      <h2>
        Та баримтын төрлөө <br /> сонгоно уу!
      </h2>
      <Button variant="slim" Component="h4" onClick={choosePrsn}>
        Хувь хүнээр
      </Button>
      <Button variant="slim" Component="h4" onClick={chooseOrg}>
        Байгууллагаар
      </Button>
    </div>
  );
};

export default Ebarimt;
