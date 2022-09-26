import HistoryHeader from 'modules/history/Header';
import HistoryItem from 'modules/history/item';

const History = () => {
  return (
    <div className="history">
      <HistoryHeader />
      <div className="row">
        <div className="col-3">
          <HistoryItem />
        </div>
      </div>
    </div>
  );
};

export default History;
