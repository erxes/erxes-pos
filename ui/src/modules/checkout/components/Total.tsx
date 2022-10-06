import useTotalValue from 'lib/useTotalValue';
import { formatNum } from 'modules/utils';

const CheckoutTotal = () => {
  const total = useTotalValue();
  return (
    <div className="flex-h-between checkout-total">
      <div className="checkall"></div>
      <h6>Нийт дүн:</h6>
      <h6 className="checkout-total-price">{formatNum(total)}₮</h6>
    </div>
  );
};

export default CheckoutTotal;
