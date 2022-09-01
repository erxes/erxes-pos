import { useApp } from 'modules/AppContext';
import useTotalValue from 'lib/useTotalValue';
import { formatNum } from 'modules/utils';

const CheckoutTotal = () => {
  const { cart } = useApp();
  const total = useTotalValue(cart);
  return (
    <div className="flex-v-center checkout-total">
      <div className="checkall">Check all</div>
      <h6>Нийт дүн:</h6>
      <h6 className="checkout-total-price">{formatNum(total)}₮</h6>
    </div>
  );
};

export default CheckoutTotal;
