import type { IComponent } from 'modules/types';
import Button from 'ui/Button';

const PaymentMethod: IComponent = ({ children }) => {
  return (
    <div className="col col-4">
      <Button variant="slim" className="payment-method flex-center">
        {children}
      </Button>
    </div>
  );
};

export default PaymentMethod;
