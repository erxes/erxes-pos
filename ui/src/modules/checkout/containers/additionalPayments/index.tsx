import { useConfigsContext } from 'modules/auth/containers/Configs';
import Payment from './Payment';
import { KHANBANK_CARD } from '../KhanbankCard';
import { GOLOMT_CARD } from '../golomtCard';
import { TDB_CARD } from '../TDBCard/useTDB';

const AdditionalPayments = () => {
  const { paymentTypes } = useConfigsContext();
  return (
    <>
      {(paymentTypes || [])
        .filter((pt) => ![KHANBANK_CARD, GOLOMT_CARD, TDB_CARD].includes(pt.type))
        .map((payment) => (
          <Payment key={payment._id} {...payment} />
        ))}
    </>
  );
};

export default AdditionalPayments;
