import Input from 'ui/Input';
import { formatNum } from 'modules/utils';
import { useCoverContext } from '../coverContext';

type INote = {
  kindOfVal: number;
  value: number;
};

type IProps = {
  cash: {
    paidType: string;
    paidSummary: INote[];
  };
  setCash: (detail: any) => void;
};

const CashCover = () => {
  const { cash, setCash } = useCoverContext();
  const handleValueChange = (value: string, idx: number) => {
    const removeLeadZero = value.toString().replace(/^0+/, '');
    const num = Number(removeLeadZero);
    const newValue = (num >= 0 && num) || 0;
    setCash((prev: any) => ({
      ...prev,
      paidSummary: (prev.paidSummary || []).map((n: any, i: number) => {
        return i === idx
          ? {
              ...n,
              value: newValue,
              amount: newValue * n.kindOfVal,
              kind: n.kindOfVal.toString(),
            }
          : n;
      }),
    }));
  };
  return (
    <div className="cover-cash">
      <p className="-subtitle">
        <b>Бэлнээр</b>
      </p>
      <div className="row">
        <div className="col-4">
          <label htmlFor="kindOfVal">мөнгөн дэвсгэрт</label>
        </div>
        <div className="col-4">
          <label htmlFor="value">Тоо ширхэг</label>
        </div>
        <div className="col-4">
          <label htmlFor="amount">Дүн</label>
        </div>
      </div>
      {(cash.paidSummary || []).map((note: INote, idx: number) => (
        <div className="row" key={idx}>
          <div className="col-4">
            <Input
              name="kindOfVal"
              value={formatNum(note.kindOfVal) + ' ₮'}
              disabled
              className="text-right"
            />
          </div>
          <div className="col-4">
            <Input
              name="value"
              value={note.value}
              type="number"
              onChange={(value) => handleValueChange(value, idx)}
            />
          </div>
          <div className="col-4">
            <Input
              name="amount"
              value={formatNum(note.kindOfVal * note.value) + ' ₮'}
              disabled
              className="text-right"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CashCover;
