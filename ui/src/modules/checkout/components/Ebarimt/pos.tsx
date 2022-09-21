import type { ReactNode, FC } from 'react';
import { IEbarimt } from '../../types';
import Button from 'ui/Button';
import Radio from 'ui/Radio';
import cn from 'classnames';
import CheckRegister from '../CheckRegister';

interface IChooseType {
  children: ReactNode;
  onClick: () => void;
  checked: boolean;
}

const ChooseType = ({ children, onClick, checked }: IChooseType) => (
  <div className="col-6 ">
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

const Ebarimt: FC<IEbarimt> = ({ type, setType }) => {
  const isOrganization = type === 'organization';
  return (
    <div className="ebarimt-root">
      <div className="ebarimt">
        <b>Төлбөрийн баримт авах</b>
        <div className="row">
          <ChooseType
            onClick={() => setType('individual')}
            checked={!isOrganization}
          >
            Хувь хүн
          </ChooseType>
          <ChooseType
            onClick={() => setType('organization')}
            checked={isOrganization}
          >
            Байгуулга
          </ChooseType>
        </div>
        <div className={cn('smooth', { active: isOrganization })}>
          {isOrganization && <CheckRegister />}
        </div>
        <Button className="print">Хэвлэх</Button>
      </div>
    </div>
  );
};

export default Ebarimt;
