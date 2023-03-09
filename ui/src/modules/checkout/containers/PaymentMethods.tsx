import Cash from './cash';
import KhanBankCard from './KhanbankCard';
import Mobile from './mobile';
import GolomtCard from './golomtCard';
import { getMode } from 'modules/utils';
import AdditionalPayments from './additionalPayments';

const PaymentMethods = () => {
  return (
    <div className="row payment-methods">
      <KhanBankCard />
      <GolomtCard />
      <Mobile />
      {getMode() === 'pos' && (
        <>
          <Cash />
          <AdditionalPayments />
        </>
      )}
    </div>
  );
};

export default PaymentMethods;
