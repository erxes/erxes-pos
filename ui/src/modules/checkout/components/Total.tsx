import { useApp } from 'modules/AppContext';
import useTotalValue from 'lib/useTotalValue';
import { formatNum } from 'modules/utils';

const CheckoutTotal = () => {
  const { isCartSelected, selectAll } = useApp();
  const total = useTotalValue();
  return (
    <div className="flex-v-center checkout-total">
      <div className="checkall" onClick={selectAll}>
        {isCartSelected ? 'Uncheck all' : 'Check all'}
      </div>
      <h6>Нийт дүн:</h6>
      <h6 className="checkout-total-price">{formatNum(total)}₮</h6>
    </div>
  );
};

export default CheckoutTotal;
