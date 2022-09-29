import type { FC } from 'react';
import type { ICartItem } from 'modules/types';
import { useApp } from 'modules/AppContext';
import Checkbox from 'ui/Checkbox';
import Counter from 'ui/Counter';
import Motocycle from 'icons/Motocycle';
import { formatNum } from 'modules/utils';

const CheckoutItem: FC<ICartItem> = ({
  name,
  count,
  unitPrice,
  _id,
  isTake,
  isSelected,
  status,
}) => {
  const { selectItem } = useApp();
  return (
    <div className="flex-h-between checkout-item">
      <div className="checkout-item-main flex-v-center">
        <Checkbox checked={isSelected} onChange={() => selectItem(_id)} />
        <div className="flex-v-center">
          <span className={'status ' + status} />
          <b>
            <span className="name flex-v-center">
              <span>{name}</span>
              {isTake && <Motocycle />}
            </span>
            <span className="price">{formatNum(unitPrice)}</span>
          </b>
        </div>
      </div>
      <Counter btnVariant="naked" count={count} _id={_id} />
    </div>
  );
};

export default CheckoutItem;
