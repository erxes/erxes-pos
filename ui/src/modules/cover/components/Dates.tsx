import Input from 'ui/Input';
import { useCoverContext } from '../coverContext';

const Dates = () => {
  const { beginDate, endDate, handleStartDate, handleEndDate } =
    useCoverContext();
  return (
    <div className="row choose-date">
      <div className="col-4">
        <label htmlFor="startDate">Эхлэх огноо</label>
        <Input
          type="datetime-local"
          value={beginDate}
          onChange={handleStartDate}
        />
      </div>
      <div className="col-4">
        <label htmlFor="endDate">Дуусах огноо</label>
        <Input type="datetime-local" value={endDate} onChange={handleEndDate} />
      </div>
    </div>
  );
};

export default Dates;
