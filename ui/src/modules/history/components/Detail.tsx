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
          <div className="flex-h-between -item" key={item._id}>
            <div>
              <b className="-name">{item.productName}</b>
              <b>{formatNum(item.unitPrice)}₮</b>
            </div>
            <h6>{item.count}ш</h6>
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
