import { useRouter } from 'next/router';
import { useApp } from 'modules/AppContext';
import useTotalValue from 'lib/useTotalValue';
import Button from 'ui/Button';
import ArrowLeft from 'icons/ArrowLeft';
import Scroll from './Scroll';
import ReviewItem from './ReviewItem';
import type { ICartItem } from 'modules/types';
import { formatNum } from 'modules/utils';
import OrderCUContainer from 'modules/checkout/containers/OrderCUContainer';
import OrderCU from './OrderCU';

const Review = () => {
  const router = useRouter();
  const { cart } = useApp();
  const totalValue = useTotalValue();
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
            <Button variant="slim" Component="h4" onClick={router.back}>
              Өөрчлөх
            </Button>
          </div>
          <div className="col-6">
            <OrderCUContainer OrderCU={OrderCU} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Review;
