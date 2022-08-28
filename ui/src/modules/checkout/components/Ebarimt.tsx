import { ReactNode, useState } from 'react';
import Button from 'ui/Button';
import Modal from 'ui/Modal';
import Radio from 'ui/Radio';
import cn from 'classnames';
import CheckRegister from './CheckRegister';

interface IChooseType {
  children: ReactNode;
  onClick: () => void;
  className?: string | boolean;
}

const ChooseType = ({ children, onClick, className }: IChooseType) => (
  <div className="col-6 ">
    <Button className={cn(className)} variant="slim" onClick={onClick}>
      <Radio />
      <b>{children}</b>
    </Button>
  </div>
);

const Ebarimt = () => {
  const [showModal, setShowModal] = useState(false);
  const [isOrganization, setIsOrganization] = useState(false);
  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        <big>Баримт хэвлэх</big>
      </Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="ebarimt">
            <b>Төлбөрийн баримт авах</b>
            <div className="row">
              <ChooseType
                onClick={() => setIsOrganization(false)}
                className={!isOrganization && 'active'}
              >
                Хувь хүн
              </ChooseType>
              <ChooseType
                onClick={() => setIsOrganization(true)}
                className={isOrganization && 'active'}
              >
                Байгуулга
              </ChooseType>
            </div>
            <div className={cn('smooth', { active: isOrganization })}>
              {isOrganization && <CheckRegister />}
            </div>

            <Button className="print">Хэвлэх</Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Ebarimt;
