import { useRouter } from 'next/router';
import Button from 'modules/common/ui/Button';
import ArrowLeft from 'modules/common/icons/ArrowLeft';
import ReviewItem from 'modules/kiosk/ReviewItem';
import Scroll from 'modules/kiosk/Scroll';
import MainLayout from 'modules/common/Layout';
import { useUI } from 'ui/context';

const data = {
  attachment: {
    url: 'https://yoshinoyabucket.s3.us-east-2.amazonaws.com/0.24390352059101983%60613-1-Copy.png',
  },
  name: 'Хонины махтай боул M size',
  unitPrice: 14500,
};

const Review = () => {
  const router = useRouter();
  const { openModal } = useUI();

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
          <ReviewItem {...data} />
          <ReviewItem {...data} />
          <ReviewItem {...data} /> <ReviewItem {...data} />
          <ReviewItem {...data} />
          <ReviewItem {...data} /> <ReviewItem {...data} />
          <ReviewItem {...data} />
          <ReviewItem {...data} />
        </Scroll>
      </div>
      <footer>
        <div className="flex-v-center">
          <h3>Нийт</h3>
          <h2 className="text-primary">40 500₮</h2>
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
