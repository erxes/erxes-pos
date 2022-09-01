import Product from 'modules/products/components/Product';
import Counter from 'modules/common/ui/Counter';

const data = {
  attachment: {
    url: 'https://yoshinoyabucket.s3.us-east-2.amazonaws.com/0.24390352059101983%60613-1-Copy.png',
  },
  name: 'Хонины махтай боул M size',
  unitPrice: 14500,
};

const CartItem = () => {
  return (
    <div className="kiosk-cart-item">
      <Product {...data} riffle={false} />
      <Counter btnVariant="flat" />
    </div>
  );
};

export default CartItem;
