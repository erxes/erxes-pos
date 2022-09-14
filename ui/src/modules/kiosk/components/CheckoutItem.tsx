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
    <div className="kiosk-review-item flex-v-center">
      <div className="flex-v-center">
        <div className="img-wrap">
          <Image src={productImgUrl} alt="" />
        </div>
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
