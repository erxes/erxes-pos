import { useState } from 'react';
import { useCheckoutContext } from '../context';
import Input from 'ui/Input';
import { formatNum } from 'modules/utils';
import Button from 'modules/common/ui/Button';
import Xmark from 'modules/common/icons/Xmark';

const PaymentInput = ({ children, setValue, value }: any) => {
  const { changeActivePayment, remainder } = useCheckoutContext();

  return (
    <div className="flex-v-center payment-input">
      <div>
        <div className="flex-v-center">
          ₮ <Input value={formatNum(value)} onChange={setValue} />
        </div>

        <caption>Үлдэгдэл: {formatNum(remainder - value)}₮</caption>
      </div>
      <div className="flex-v-center">
        {children}
        <Button variant="ghost" onClick={() => changeActivePayment('')}>
          <Xmark />
        </Button>
      </div>
    </div>
  );
};

export default PaymentInput;
