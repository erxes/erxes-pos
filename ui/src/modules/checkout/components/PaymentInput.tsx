import { useState } from 'react';
import { useCheckoutContext } from '../context';
import Input from 'ui/Input';
import { formatNum } from 'modules/utils';
import Button from 'modules/common/ui/Button';
import Xmark from 'modules/common/icons/Xmark';

const PaymentInput = ({ children, setValue, value }: any) => {
  const { changeActivePayment, remainder, cash, qpay, card, setRemainder } =
    useCheckoutContext();

  const handleClick = () => {
    const newRemainder = remainder - cash - qpay - card;
    newRemainder >= 0 && setRemainder(newRemainder);
    changeActivePayment('');
  };

  return (
    <div className="flex-v-center payment-input">
      <div>
        <div className="flex-v-center">
          ₮ <Input value={formatNum(value)} onChange={setValue} />
        </div>

        <span className="caption">
          Үлдэгдэл: {formatNum(remainder - value)}₮
        </span>
      </div>
      <div className="flex-v-center">
        {children}
        <Button variant="ghost" onClick={handleClick}>
          <Xmark />
        </Button>
      </div>
    </div>
  );
};

export default PaymentInput;
