import { useApp } from 'modules/AppContext';
import HistoryItem from './item';
import { formatNum } from '../../utils';

const Detail = () => {
  const { orderDetail } = useApp();
  const { items, _id } = orderDetail;

  return (
    <div className="history-detail">
      <HistoryItem order={orderDetail} />
      {items.map((item: any) => (
        <div className="flex-v-center -item" key={item._id}>
          <div>
            <b className="-name">{item.productName}</b>
            <b>{formatNum(item.unitPrice)}₮</b>
          </div>
          <h6>1ш</h6>
        </div>
      ))}
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
