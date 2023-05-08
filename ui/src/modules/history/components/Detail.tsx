import { useApp } from 'modules/AppContext';
import HistoryItem from './item';
import { formatNum } from '../../utils';

const Detail = () => {
  const { orderDetail } = useApp();
  const { items, _id } = orderDetail;

  return (
    <div className="history-detail">
      <HistoryItem order={orderDetail} />
      <div className="history-detail-items">
        {items.map((item: any) => (
          <div className=" -item" key={item._id}>
            <b className="-name">{item.productName}</b>
            <div className="flex-h-between">
              <p>
                {item.unitPrice}₮ x {item.count}ш
              </p>
              <h6>
                <b>{formatNum(item.unitPrice * item.count)}₮ </b>
              </h6>
            </div>
          </div>
        ))}
      </div>
      <a
        href={`/order-receipt/${_id}`}
        target="_blank"
        rel="noreferrer"
        className="btn slim"
      >
        <big>Баримт хэвлэх</big>
      </a>
    </div>
  );
};

export default Detail;
