import type { IComponent } from 'modules/types';

const PaymentMethod: IComponent = ({ children }) => {
  return (
    <div className="col col-4">
      <div className="payment-method flex-center">{children}</div>
    </div>
  );
};

export default PaymentMethod;
