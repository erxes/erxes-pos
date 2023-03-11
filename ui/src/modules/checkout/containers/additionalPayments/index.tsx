import { useConfigsContext } from 'modules/auth/containers/Configs';
import Payment from './Payment';
import { BANK_CARDS } from 'modules/constants';

const AdditionalPayments = () => {
  const { paymentTypes } = useConfigsContext();
  return (
    <>
      {(paymentTypes || [])
        .filter((pt) => !BANK_CARDS.includes(pt.type))
        .map((payment) => (
          <Payment key={payment._id} {...payment} />
        ))}
    </>
  );
};

export default AdditionalPayments;
