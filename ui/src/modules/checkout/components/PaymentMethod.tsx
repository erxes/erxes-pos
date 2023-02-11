/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react';
import { useCheckoutContext } from 'modules/checkout/context';
import { useUI } from 'modules/common/ui/context';
import Button, { ButtonProps } from 'ui/Button';
import PaymentInput from './PaymentInput';
import { getMode } from 'modules/utils';
import cn from 'classnames';

type IProps = ButtonProps & {
  name: string;
  onClick: () => void;
  loading?: boolean;
  btnText: string;
};

const PaymentMethod: FC<IProps> = ({
  name = 'mobile',
  onClick,
  loading,
  btnText,
  ...restProps
}) => {
  const mode = getMode();
  const { activePayment, changeActivePayment, setValue, remainder, amounts } =
    useCheckoutContext();
  const { latestClickedKey, changeKey } = useUI();
  const value = amounts[name] || 0;

  useEffect(() => {
    if (latestClickedKey && activePayment === name) {
      if (latestClickedKey === 'C') {
        return setValue(0, name);
      }
      if (latestClickedKey === 'CE') {
        return setValue((value + '').slice(0, -1), name);
      }
      setValue(value + '' + latestClickedKey, name);
    }
  }, [latestClickedKey]);

  useEffect(() => {
    if (activePayment === name) {
      remainder >= 0 && setValue(remainder, name);
    }
  }, [activePayment, remainder]);

  useEffect(() => {
    changeKey('');
  }, [value]);

  const handleClick = () => {
    if (mode === 'pos') {
      return changeActivePayment(name);
    }
    return onClick();
  };

  if (activePayment === name)
    return (
      <PaymentInput
        onClick={() => changeActivePayment('')}
        setValue={(val: any) => setValue(val, name)}
        value={value}
      >
        <Button
          onClick={onClick}
          loading={loading}
          disabled={value === 0 || remainder <= 0}
        >
          {btnText}
        </Button>
      </PaymentInput>
    );

  if (activePayment === '')
    return (
      <div className={cn('col', mode === 'pos' ? 'col-4' : 'col-12 ')}>
        <Button
          variant="slim"
          className={cn('payment-method flex-center', '-' + mode)}
          onClick={handleClick}
          loading={loading}
          {...restProps}
        />
      </div>
    );
  return null;
};

export default PaymentMethod;
