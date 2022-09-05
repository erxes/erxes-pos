import { useApp } from 'modules/AppContext';
import useTotalValue from 'lib/useTotalValue';
import { formatNum } from 'modules/utils';
import Button from 'ui/Button';

const GoToPaymentContainer = () => {
  const { cart } = useApp();
  const total = useTotalValue(cart);

  return (
    <Button className="pay" disabled={!total}>
      Төлбөр төлөх {total ? formatNum(total) + '₮' : ''}
    </Button>
  );
};

export default GoToPaymentContainer;
