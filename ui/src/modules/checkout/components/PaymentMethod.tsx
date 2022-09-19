import { FC } from 'react';
import Button, { ButtonProps } from 'ui/Button';
import { getMode } from 'modules/utils';
import cn from 'classnames';

const PaymentMethod: FC<ButtonProps> = (props) => {
  return (
    <div className={cn('col', { 'col-4': getMode() === 'pos' })}>
      <Button
        variant="slim"
        className="payment-method flex-center"
        {...props}
      />
    </div>
  );
};

export default PaymentMethod;
