import Image from 'ui/Image';
import { formatNum } from 'modules/utils';
import { FC } from 'react';

const ReviewItem: FC<any> = ({
  productImgUrl,
  productName,
  unitPrice,
  count,
}) => {
  return (
    <div className="kiosk-review-item flex-h-between">
      <div className="flex-v-center">
        <Image src={productImgUrl} alt="" />
        <h4>{productName}</h4>
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
