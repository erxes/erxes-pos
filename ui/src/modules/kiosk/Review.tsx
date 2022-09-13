import { useRouter } from 'next/router';
import { useApp } from 'modules/AppContext';
import { useUI } from 'ui/context';
import Button from 'ui/Button';
import ArrowLeft from 'icons/ArrowLeft';
import Scroll from './Scroll';
import ReviewItem from './ReviewItem';
import type { ICartItem } from 'modules/types';
import { formatNum } from 'modules/utils';

const Review = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const { openModal } = useUI();
  const { orderDetail } = useApp();
  const { items, totalAmount } = orderDetail;

  if (!orderId) return null;

  const handleBack = () => router.push({ pathname: '/', query: { orderId } });

  const handleCorrect = () => {};

  return (
    <div className="kiosk-review-root">
      <Button
        variant="naked"
        Component="h5"
        className="back"
        onClick={handleBack}
      >
        <ArrowLeft />
        Буцах
      </Button>
      <h2>
        Захиалга <br /> баталгаажуулах
      </h2>
      <div className="kiosk-review">
        <Scroll>
          {items.map((data: ICartItem) => (
            <ReviewItem {...data} key={data._id} />
          ))}
        </Scroll>
      </div>
      <footer>
        <div className="flex-v-center">
          <h3>Нийт</h3>
          <h2 className="text-primary">{formatNum(totalAmount)}₮</h2>
        </div>
        <div className="row">
          <div className="col-6">
            <Button variant="slim" Component="h4" onClick={handleBack}>
              Өөрчлөх
            </Button>
          </div>
          <div className="col-6">
            <Button Component="h4" onClick={handleCorrect}>
              Зөв байна
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Review;
