import { useCheckoutContext } from '../context';
import Input from 'ui/Input';
import { formatNum } from 'modules/utils';
import Button from 'modules/common/ui/Button';
import Xmark from 'modules/common/icons/Xmark';

const PaymentInput = ({ children, setValue, value, disabled }: any) => {
  const { changeActivePayment, remainder } = useCheckoutContext();

  const handleClose = () => {
    changeActivePayment('');
  };

  return (
    <div className="flex-h-between payment-input">
      <div>
        <div className="flex-v-center">
          ₮
          <Input
            value={formatNum(value)}
            onChange={setValue}
            disabled={disabled}
          />
        </div>

        <span className="caption">
          Үлдэгдэл: {formatNum(remainder - value)}₮
        </span>
      </div>
      <div className="flex-v-center">
        {children}
        <Button variant="ghost" onClick={handleClose}>
          <Xmark />
        </Button>
      </div>
    </div>
  );
};

export default PaymentInput;
