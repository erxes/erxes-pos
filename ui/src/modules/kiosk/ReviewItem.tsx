import Image from 'next/future/image';

const ReviewItem = ({ attachment, name, unitPrice }: any) => {
  return (
    <div className="kiosk-review-item flex-v-center">
      <div className="flex-v-center">
        <div className="img-wrap">
          <Image fill src={attachment.url} alt="" />
        </div>
        <h4>{name}</h4>
      </div>
      <h4 className="text-primary">
        2<span>x</span>
        {unitPrice}
      </h4>
    </div>
  );
};

export default ReviewItem;
