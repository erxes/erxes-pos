import type { FC } from 'react';
import type { ICartItem } from 'modules/types';
import { useApp } from 'modules/AppContext';
import Checkbox from 'ui/Checkbox';
import Counter from 'ui/Counter';
import Motocycle from 'icons/Motocycle';
import { formatNum } from 'modules/utils';

const CheckoutItem: FC<ICartItem & { type: string }> = ({
  name,
  count,
  unitPrice,
  _id,
  isTake,
  status,
  type,
}) => {
  const { selectItem } = useApp();
  return (
    <div className="flex-h-between checkout-item">
      <div className="checkout-item-main flex-v-center">
        {type === 'eat' && (
          <abbr title="Авч явах бол тусгайлан тэмдэглэх">
            <Checkbox checked={isTake} onChange={() => selectItem(_id)} />
          </abbr>
        )}
        <div className="flex-v-center">
          <span className={'status ' + status}></span>

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
