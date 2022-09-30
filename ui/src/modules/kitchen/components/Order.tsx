import { useState } from 'react';
import OrderItem from '../containers/OrderItem';
import Timer from './Timer';
import OrderContainer from '../containers/Order';

const Order = ({ number, type, items, origin, paidDate, _id }: any) => {
  const [allDone, setAllDone] = useState(false);

  return (
    <div className="kitchen-order">
      <div className="-header">
        <div className="flex-h-between">
          <h5>#{number.split('_')[1]}</h5>
          <Timer paidDate={paidDate} />
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
        <OrderItem key={item._id} {...item} allDone={allDone} />
      ))}
      <OrderContainer _id={_id} setAllDone={setAllDone} />
    </div>
  );
};

export default Order;
