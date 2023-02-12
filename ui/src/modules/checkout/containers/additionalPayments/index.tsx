import { useConfigsContext } from 'modules/auth/containers/Configs';
import Payment from './Payment';
import { KHANBANK_CARD } from '../DataBankCard';
import { GOLOMT_CARD } from '../golomtCard';

const AdditionalPayments = () => {
  const { paymentTypes } = useConfigsContext();
  return (
    <>
      {(paymentTypes || [])
        .filter((pt) => ![KHANBANK_CARD, GOLOMT_CARD].includes(pt.type))
        .map((payment) => (
          <Payment key={payment._id} {...payment} />
        ))}
    </>
  );
};

export default AdditionalPayments;
