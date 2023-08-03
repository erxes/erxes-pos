import Input from 'ui/Input';
import { handlePaymentChange, getValueOfPayment } from '../utils';
import { useCoverContext } from '../coverContext';
import { formatNum } from 'modules/utils';
import { useRouter } from 'next/router';

const CoverTemplates = ({
  payment,
}: {
  payment: {
    type: string;
    title: string;
  };
}) => {
  const { getDetail, setDetails, calcAmounts } = useCoverContext();
  const detail = getDetail(payment.type);
  const router = useRouter();
  const { id } = router.query;

  const handleChange = (value: string) =>
    handlePaymentChange(value, payment.type, setDetails);

  return (
    <div className="cover-templates">
      <p className="-subtitle">
        <b>
          {payment.title}
          {`(${formatNum(
            id === 'create' ? calcAmounts[payment.type] : detail.paidDetail || 0
          )}₮)`}
        </b>
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
