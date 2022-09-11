import { useRouter } from 'next/router';
import Button from 'modules/common/ui/Button';
import ArrowLeft from 'modules/common/icons/ArrowLeft';
import ReviewItem from 'modules/kiosk/ReviewItem';
import Scroll from 'modules/kiosk/Scroll';
import MainLayout from 'modules/common/Layout';
import { useUI } from 'ui/context';
import { useApp } from 'modules/AppContext';
import type { ICartItem } from 'modules/types';
import useTotalValue from 'lib/useTotalValue';
import { formatNum } from 'modules/utils';

const Review = () => {
  const router = useRouter();
  const { openModal } = useUI();
  const { cart } = useApp();
  const totalValue = useTotalValue(cart);

  return (
    <div className="kiosk-review-root">
      <Button
        variant="naked"
        Component="h5"
        className="back"
        onClick={router.back}
      >
        <ArrowLeft />
        Буцах
      </Button>
      <h2>
        Захиалга <br /> баталгаажуулах
      </h2>
      <div className="kiosk-review">
        <Scroll>
          {cart.map((data: ICartItem) => (
            <ReviewItem {...data} key={data._id} />
          ))}
        </Scroll>
      </div>
      <footer>
        <div className="flex-v-center">
          <h3>Нийт</h3>
          <h2 className="text-primary">{formatNum(totalValue)}₮</h2>
        </div>
        <div className="row">
          <div className="col-6">
            <Button variant="slim" Component="h4">
              Өөрчлөх
            </Button>
          </div>
          <div className="col-6">
            <Button Component="h4" onClick={openModal}>
              Зөв байна
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

Review.Layout = MainLayout;

export default Review;
