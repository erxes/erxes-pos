import Input from 'ui/Input';
import { handlePaymentChange, getValueOfPayment } from '../utils';
import { useCoverContext } from '../coverContext';

const CoverTemplates = ({
  payment,
}: {
  payment: {
    type: string;
    title: string;
  };
}) => {
  const { getDetail, setDetails } = useCoverContext();
  const detail = getDetail(payment.type);

  const handleChange = (value: string) =>
    handlePaymentChange(value, payment.type, setDetails);

  return (
    <div className="cover-templates">
      <p className="-subtitle">
        <b>{payment.title}</b>
      </p>
      <div className="row">
        <div className="col-4">
          <label htmlFor="kindOfVal">Дүн</label>
          <Input
            name="amount"
            value={getValueOfPayment(detail)}
            onChange={handleChange}
            type="number"
          />
        </div>
      </div>
    </div>
  );
};

export default CoverTemplates;
