import Button from 'modules/common/ui/Button';
import Link from 'next/link';

const CheckoutControls = () => {
  return (
    <div className="checkout-controls">
      <Button className="take">Авч явах</Button>
      <Link href="/checkout" passHref>
        <Button className="pay" Component="a">
          Төлбөр төлөх 42 500₮
        </Button>
      </Link>
    </div>
  );
};

export default CheckoutControls;
