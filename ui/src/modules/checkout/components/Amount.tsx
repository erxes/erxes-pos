import { formatNum, calcTaxAmount } from 'modules/utils';
import { useApp } from 'modules/AppContext';
import { useConfigsContext } from 'modules/auth/containers/Configs';

const Amount = () => {
  const { currentConfig } = useConfigsContext();
  const { orderDetail } = useApp();
  const {
    totalAmount,
    cashAmount,
    cardAmount,
    mobileAmount,
    receivableAmount,
  } = orderDetail;

  const taxAmount = calcTaxAmount(
    totalAmount,
    currentConfig && currentConfig.ebarimtConfig
  );

  const Field = ({ text, val }: { text: string; val: number }) => {
    if (!val) return null;

    return (
      <div className="field">
        <b>{text}:</b>
        {formatNum(val, ',')}₮
      </div>
    );
  };

  return (
    <div>
      <div className="block -sm">
        <Field text="Дүн" val={totalAmount} />
        <Field text="НӨАТ" val={taxAmount.vatAmount} />
        <Field text="НХАТ" val={taxAmount.cityTaxAmount} />
        <Field text="Бэлнээр" val={cashAmount} />
        <Field text="Картаар" val={cardAmount} />
        <Field text="Мобайл" val={mobileAmount} />
        <Field text="Дараах" val={receivableAmount} />
      </div>
    </div>
  );
};

export default Amount;
