import { formatNum, getSumsOfAmount } from 'modules/utils';
import { useApp } from 'modules/AppContext';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import { useRouter } from 'next/router';
import cn from 'classnames';

const Amount = () => {
  const router = useRouter();
  const { paymentTypes } = useConfigsContext();
  const { orderDetail } = useApp();
  const { totalAmount, cashAmount, mobileAmount, paidAmounts, items } = orderDetail;
  let sumDiscountAmount = 0;
  
  for (const item of items || []) {
    sumDiscountAmount += item.discountAmount || 0;
  }

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
      <div className={cn('-sm', { block: !router.query.type })}>
        <Field text="Хөнгөлөлт" val={sumDiscountAmount} />
        <Field text="Дүн" val={totalAmount} />
        <Field text="Бэлнээр" val={cashAmount} />
        <Field text="Мобайл" val={mobileAmount} />
        {Object.values(getSumsOfAmount(paidAmounts, paymentTypes)).map(
          (i: any) => (
            <Field text={i.title} val={i.value} key={i.title} />
          )
        )}
      </div>
    </div>
  );
};

export default Amount;
