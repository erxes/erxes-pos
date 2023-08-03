import Input, { InputProps } from 'ui/Input';
import { formatNum } from 'modules/utils';
import { useCoverContext } from '../coverContext';

type INote = {
  kindOfVal: number;
  value: number;
};

const CashInput = ({ value, ...rest }: InputProps) => (
  <Input {...rest} value={formatNum(Number(value)) + ' ₮'} />
);

const CashCover = () => {
  const { cash, setCash, totalCash } = useCoverContext();
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

  const totalAmount = (cash.paidSummary || []).reduce(
    (total: number, { kindOfVal, value }: INote) => {
      return total + kindOfVal * value;
    },
    0
  );

  return (
    <div className="cover-cash">
      <p className="-subtitle">
        <b>Бэлнээр ({formatNum(totalCash)}₮)</b>
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
            <CashInput
              name="kindOfVal"
              value={note.kindOfVal}
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
            <CashInput
              name="amount"
              value={note.kindOfVal * note.value}
              disabled
              className="text-right"
            />
          </div>
        </div>
      ))}
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4"> </div>
        <b className="col-4 text-right">
          <div className="flex-v-center total-cash">
            <p>Нийт:</p>
            <CashInput disabled className="text-right" value={totalAmount} />
          </div>
          <div className="text-right">Зөрүү: {totalCash - totalAmount}</div>
        </b>
      </div>
    </div>
  );
};

export default CashCover;
