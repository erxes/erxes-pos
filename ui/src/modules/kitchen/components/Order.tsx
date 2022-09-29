import Button from 'ui/Button';
import OrderItem from './OrderItem';
import Timer from './Timer';

const Order = ({ data }: any) => {
  const { number, type, items, origin, paidDate } = data;

  const date = new Date(paidDate);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const oTime = seconds + minutes * 60 + hours * 3600;

  return (
    <div className="kitchen-order">
      <div className="-header">
        <div className="flex-h-between">
          <h5>#{number.split('_')[1]}</h5>
          <Timer oTime={oTime} />
        </div>
        <div className="flex-h-between">
          <p className="btn flat -tag">
            {type === 'eat' && 'Зааланд'}
            {type === 'take' && 'Авч явах'}
          </p>
          <p className="-origin">{origin ? origin : 'Pos'}</p>
        </div>
      </div>
      {items.map((item: any) => (
        <OrderItem key={item._id} data={item} />
      ))}
      <Button variant="slim">Бэлэн болсон</Button>
    </div>
  );
};

export default Order;
