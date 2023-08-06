import { ReactNode } from 'react';
import { useApp } from 'modules/AppContext';
import { useUI } from 'ui/context';
import Button from 'ui/Button';
import Radio from 'ui/Radio';
import cn from 'classnames';
import CheckRegister from '../CheckRegister';
import useSettlePayment from 'lib/useSettlePayment';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import { NOT_FOUND } from 'modules/constants';
import { BILL_TYPES } from 'modules/constants';
import { checkElementsIncluded } from 'modules/utils';

interface IChooseType {
  children: ReactNode;
  value: string;
  settlePayment: (value: string) => void;
  loading: boolean;
}

const ChooseType = ({
  children,
  value,
  settlePayment,
  loading,
}: IChooseType) => {
  const { allowInnerBill } = useConfigsContext();
  const {
    billType,
    setBillType,
    setRegisterNumber,
    registerNumber,
    orderDetail,
    customerType,
  } = useApp();
  const checked = billType === value;

  const onClick = () => {
    setBillType(value);

    if (value !== BILL_TYPES.ENTITY) {
      setRegisterNumber(null);
      return settlePayment(value);
    }

    if (!registerNumber && customerType === 'company') {
      const code = orderDetail?.customer?.code;
      return code && setRegisterNumber(code);
    }
  };

  return (
    <div className={allowInnerBill ? 'col-4' : 'col-6'}>
      <Button
        className={cn({ active: checked })}
        variant="slim"
        onClick={onClick}
        loading={loading}
      >
        <Radio mode={checked && 'checked'} />
        <b>{children}</b>
      </Button>
    </div>
  );
};

const Ebarimt = () => {
  const { closeModal } = useUI();
  const { companyName, billType, orderDetail } = useApp();
  const { allowInnerBill, paymentTypes } = useConfigsContext();
  const { CITIZEN, ENTITY, INNER } = BILL_TYPES;
  const isOrg = billType === ENTITY;

  const showReciept = () => {
    closeModal();
    window.location.href = '/';
  };

  const onCompleted = () => {
    return showReciept();
  };

  const { settlePayment, loading } = useSettlePayment(onCompleted);

  const chooseTypeProps = {
    settlePayment,
    loading,
  };

  const checkSkipEbarimt = () => {
    const { paidAmounts } = orderDetail;
    const skipEbarimt = (
      paymentTypes?.filter((pt) => pt?.config?.skipEbarimt) || []
    ).map((pt) => pt.type);
    const paidTypes = (paidAmounts || []).map((pa: any) => pa?.type);
    return checkElementsIncluded(paidTypes, skipEbarimt);
  };

  return (
    <div className="ebarimt-root">
      <div className="ebarimt">
        <b>Төлбөрийн баримт авах</b>
        <div className="row">
          {!checkSkipEbarimt() && (
            <>
              <ChooseType
                {...chooseTypeProps}
                value={CITIZEN}
                loading={loading}
              >
                Хувь хүн
              </ChooseType>
              <ChooseType {...chooseTypeProps} value={ENTITY} loading={loading}>
                Байгуулга
              </ChooseType>
            </>
          )}
          {(allowInnerBill || checkSkipEbarimt()) && (
            <ChooseType {...chooseTypeProps} value={INNER} loading={loading}>
              Дотоод
            </ChooseType>
          )}
        </div>
        <div className={cn('smooth', { active: isOrg })}>
          {isOrg && <CheckRegister />}
        </div>
        {isOrg && !!companyName && companyName !== NOT_FOUND && (
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
