import Cash from './cash';
import DataBankCard from './DataBankCard';
import Mobile from './mobile';
import GolomtCard from './golomtCard';
import { getMode } from 'modules/utils';
import AdditionalPayments from './additionalPayments';

const PaymentMethods = () => {
  return (
    <div className="row payment-methods">
      <DataBankCard />
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
