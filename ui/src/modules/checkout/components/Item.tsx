import type { FC } from 'react';
import type { ICartItem } from 'modules/types';
import { useApp } from 'modules/AppContext';
import useIsEditable from 'lib/useIsEditable';
import Checkbox from 'ui/Checkbox';
import Counter from 'ui/Counter';
import Motocycle from 'icons/Motocycle';
import { formatNum } from 'modules/utils';
import PriceInfoContainer from '../containers/Price';

const CheckoutItem: FC<ICartItem & { type: string }> = (props) => {
  const {
    name,
    unitPrice,
    _id,
    isTake,
    status,
    type,
    discountAmount,
    discountPercent,
    productId
  } = props;

  const { selectItem } = useApp();
  const { paidDate, warning } = useIsEditable();

  const handleCheck = () => {
    if (paidDate) return warning();
    return selectItem(_id);
  };

  return (
    <div className="flex-h-between checkout-item">
      <div className="checkout-item-main flex-v-center">
        {type === 'eat' && (
          <abbr title="Авч явах бол тусгайлан тэмдэглэх">
            <Checkbox checked={isTake} onChange={handleCheck} />
          </abbr>
        )}
        <div className="flex-v-center">
          <span className={'status flex-0 ' + status}></span>

          <b>
            <span className="name flex-v-center">
              <span>{name}</span>
              {isTake && <Motocycle />}
            </span>
            <span className="price">
              <PriceInfoContainer
                productId={productId}
                price={unitPrice}
              />
              {!!discountPercent && ' (' + discountPercent + '%)'}{' '}
              {!!discountAmount && ' -' + formatNum(discountAmount) + '₮'}
            </span>
          </b>
        </div>
      </div>
      <Counter btnVariant="naked" {...props} />
    </div >
  );
};

export default CheckoutItem;
