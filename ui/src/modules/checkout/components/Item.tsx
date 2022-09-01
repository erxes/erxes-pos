import type { FC } from 'react';
import type { ICartItem } from 'modules/types';
import Checkbox from 'modules/common/ui/Checkbox';
import Counter from 'modules/common/ui/Counter';
import { formatNum } from 'modules/utils';

const CheckoutItem: FC<ICartItem> = ({ name, count, unitPrice, _id }) => {
  return (
    <div className="flex-v-center checkout-item">
      <div className="checkout-item-main flex-v-center">
        <Checkbox />
        <div className="flex-v-center">
          <span className="status" />
          <b>
            <span className="name">{name}</span>
            <span className="price">{formatNum(unitPrice)}</span>
          </b>
        </div>
      </div>
      <Counter btnVariant="naked" count={count} _id={_id} />
    </div>
  );
};

export default CheckoutItem;
