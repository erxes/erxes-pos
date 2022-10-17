import useTotalValue from 'lib/useTotalValue';
import { useApp } from 'modules/AppContext';
import { formatNum } from 'modules/utils';

const CheckoutTotal = () => {
  const { orderDetail } = useApp();
  const total = useTotalValue();
  return (
    <div className="flex-h-between checkout-total">
      <h6>№ {((orderDetail || {}).number || '').split('_')[1]}</h6>
      <h6>Нийт дүн:</h6>
      <h6 className="checkout-total-price">{formatNum(total)}₮</h6>
    </div>
  );
};

export default CheckoutTotal;
