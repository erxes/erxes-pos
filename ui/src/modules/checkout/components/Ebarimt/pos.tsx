import { ReactNode, useEffect } from 'react';
import { useApp } from 'modules/AppContext';
import { useUI } from 'ui/context';
import useBillType from 'lib/useBillType';
import Button from 'ui/Button';
import Radio from 'ui/Radio';
import cn from 'classnames';
import CheckRegister from '../CheckRegister';
import useSettlePayment from 'lib/useSettlePayment';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import { NOT_FOUND } from 'modules/constants';

interface IChooseType {
  children: ReactNode;
  onClick: () => void;
  checked: boolean;
}

const ChooseType = ({ children, onClick, checked }: IChooseType) => (
  <div className="col-4 ">
    <Button
      className={cn({ active: checked })}
      variant="slim"
      onClick={onClick}
    >
      <Radio mode={checked && 'checked'} />
      <b>{children}</b>
    </Button>
  </div>
);

const Ebarimt = () => {
  const {
    closeModal,
    setSidebarView,
    setSidebarPlacement,
    openSidebar,
    closeSidebar,
  } = useUI();
  const { isOrg, isPrsn, isInner, chooseOrg, choosePrsn, chooseInner } =
    useBillType();
  const { companyName, billType } = useApp();
  const { allowInnerBill } = useConfigsContext();

  const showReciept = () => {
    closeModal();
    window.location.href = '/';
  };

  const onCompleted = () => {
    return showReciept();
  };

  const { settlePayment, loading } = useSettlePayment(onCompleted);

  useEffect(() => {
    if (isOrg) {
      setSidebarView('KEYBOARD_VIEW');
      setSidebarPlacement('BOTTOM');
      openSidebar();

      return closeSidebar;
    }

    closeSidebar();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billType]);

  return (
    <div className="ebarimt-root">
      <div className="ebarimt">
        <b>Төлбөрийн баримт авах</b>
        <div className="row">
          <ChooseType onClick={choosePrsn} checked={isPrsn}>
            Хувь хүн
          </ChooseType>
          <ChooseType onClick={chooseOrg} checked={isOrg}>
            Байгуулга
          </ChooseType>
          {allowInnerBill && (
            <ChooseType onClick={chooseInner} checked={isInner}>
              Дотоод
            </ChooseType>
          )}
        </div>
        <div className={cn('smooth', { active: isOrg })}>
          {isOrg && <CheckRegister />}
        </div>
        {((isOrg && !!companyName && companyName !== NOT_FOUND) ||
          isInner ||
          isPrsn) && (
          <Button
            loading={loading}
            className="print"
            onClick={() => settlePayment()}
          >
            Хэвлэх
          </Button>
        )}
      </div>
    </div>
  );
};

export default Ebarimt;
