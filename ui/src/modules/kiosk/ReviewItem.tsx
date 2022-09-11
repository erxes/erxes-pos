import Image from 'next/future/image';
import { formatNum } from 'modules/utils';
import type { ICartItem } from 'modules/types';
import { FC } from 'react';

const ReviewItem: FC<ICartItem> = ({
  productImgUrl,
  name,
  unitPrice,
  count,
}) => {
  return (
    <div className="kiosk-review-item flex-v-center">
      <div className="flex-v-center">
        <div className="img-wrap">
          <Image fill src={productImgUrl} alt="" />
        </div>
        <h4>{name}</h4>
      </div>
      <h4 className="text-primary">
        {count}
        <span>x</span>
        {formatNum(unitPrice)}₮
      </h4>
    </div>
  );
};

export default ReviewItem;
