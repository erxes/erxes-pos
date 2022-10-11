import { useApp } from 'modules/AppContext';
import { useUI } from 'modules/common/ui/context';
import Button from 'ui/Button';
import { formatNum } from 'modules/utils';
import Ink from 'react-ink';
import dayjs from 'dayjs';
import { renderType } from 'modules/utils';

const HistoryItem = ({ order }: any) => {
  const { setOrderDetail } = useApp();
  const { setModalView, openModal } = useUI();
  const { totalAmount, paidDate, type, number } = order;
  const date = dayjs(paidDate).format('DD/MM/YYYY');

  const handleClick = () => {
    setOrderDetail(order);
    setModalView('HISTORY_VIEW');
    openModal();
  };

  return (
    <div className="history-item" onClick={handleClick}>
      <div className="flex-h-between">
        <b>{formatNum(totalAmount)}₮</b>
        <b>#{number.split('_')[1]}</b>
      </div>
      <div className="flex-h-between">
        <Button riffle={false}>{renderType(type)}</Button>
        <span className="caption">{paidDate && date}</span>
      </div>
      <Ink />
    </div>
  );
};

export default HistoryItem;
