import Button from '../common/ui/Button/index';
const HistoryItem = () => {
  return (
    <div className="history-item">
      <div className="flex-v-center">
        <b>17 500</b>
        <b>#0001</b>
      </div>
      <div className="flex-v-center">
        <Button>Зааланд</Button>
        <span className="caption">22/07/22</span>
      </div>
    </div>
  );
};

export default HistoryItem;
