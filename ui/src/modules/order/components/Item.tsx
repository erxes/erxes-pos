import Checkbox from 'ui/Checkbox';
import Button from 'ui/Button';
import Minus from 'icons/Minus';
import Plus from 'icons/Plus';

const OrderItem = () => {
  return (
    <div className="flex-v-center order-item">
      <div className="order-item-main flex-v-center">
        <Checkbox />
        <div className="flex-v-center">
          <span className="status" />
          <b>
            <span className="name">Бяслагтай Гюүдон</span>
            <span className="price">17 500₮</span>
          </b>
        </div>
      </div>
      <div className="order-item-controls flex-v-center">
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

export default OrderItem;
