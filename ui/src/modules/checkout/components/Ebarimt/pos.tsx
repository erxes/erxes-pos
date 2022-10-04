import type { ReactNode } from 'react';
import { useApp } from 'modules/AppContext';
import useBillType from 'lib/useBillType';
import Button from 'ui/Button';
import Radio from 'ui/Radio';
import cn from 'classnames';
import CheckRegister from '../CheckRegister';
import PrintEBarimt from '../../containers/PrintEBarimt';
import { useConfigsContext } from 'modules/auth/containers/Configs';

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
  const { companyName } = useApp();
  const { allowInnerBill } = useConfigsContext();
  const { isOrg, isPrsn, isInner, chooseOrg, choosePrsn, chooseInner } =
    useBillType();

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
        {(isPrsn || (isOrg && companyName) || isInner) && <PrintEBarimt />}
      </div>
    </div>
  );
};

export default Ebarimt;
