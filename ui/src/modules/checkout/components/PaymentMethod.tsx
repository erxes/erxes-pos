import { FC } from 'react';
import Button, { ButtonProps } from 'ui/Button';

const PaymentMethod: FC<ButtonProps> = (props) => {
  return (
    <div className="col col-4">
      <Button
        variant="slim"
        className="payment-method flex-center"
        {...props}
      />
    </div>
  );
};

export default PaymentMethod;
