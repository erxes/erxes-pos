import dynamic from 'next/dynamic';
import { getMode } from 'modules/utils';

const ReviewKiosk = dynamic(() => import('modules/kiosk/Review'), {
  suspense: true,
});

const Review = () => {
  if (getMode() === 'kiosk') return <ReviewKiosk />;

  return <div>404</div>;
};

const MainLayout = dynamic(() => import('modules/common/Layout'), {
  suspense: true,
});

Review.Layout = getMode() === 'kiosk' ? MainLayout : null;

export default Review;
