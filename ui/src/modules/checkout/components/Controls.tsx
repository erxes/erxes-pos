import Button from 'ui/Button';
import { useApp } from 'modules/AppContext';
import GoToPaymentContainer from '../containers/GoToPayment';

const CheckoutControls = () => {
  const { delivery, cart } = useApp();
  return (
    <div className="checkout-controls">
      <Button
        className="take"
        onClick={delivery}
        disabled={!cart || !cart.length}
      >
        Авч явах
      </Button>
      <GoToPaymentContainer />
    </div>
  );
};

export default CheckoutControls;
