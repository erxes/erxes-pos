import Input from 'ui/Input';
import { handlePaymentChange, getValueOfPayment } from '../utils';

const CoverTemplates = ({
  payment,
  setDetails,
  getDetail,
}: {
  payment: {
    type: string;
    title: string;
  };
  setDetails: (detail: any) => void;
  getDetail: any;
}) => {
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
