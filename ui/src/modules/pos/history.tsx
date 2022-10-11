import HistoryHeader from 'modules/history/components/Header';
import FullOrders from 'modules/history/containers/FullOrders';

const History = () => {
  return (
    <div className="history flex-col">
      <HistoryHeader />
      <FullOrders />
    </div>
  );
};

export default History;
