import Checkbox from 'ui/Checkbox';
import Button from 'ui/Button';
import Minus from 'icons/Minus';
import Plus from 'icons/Plus';

const CheckoutItem = () => {
  return (
    <div className="flex-v-center checkout-item">
      <div className="checkout-item-main flex-v-center">
        <Checkbox />
        <div className="flex-v-center">
          <span className="status" />
          <b>
            <span className="name">Бяслагтай Гюүдон</span>
            <span className="price">17 500₮</span>
          </b>
        </div>
      </div>
      <div className="checkout-item-controls flex-v-center">
        <Button variant="naked">
          <Minus />
        </Button>
        <span className="count">1</span>
        <Button variant="naked">
          <Plus />
        </Button>
      </div>
    </div>
  );
};

export default CheckoutItem;
