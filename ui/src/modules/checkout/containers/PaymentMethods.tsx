import Cash from './cash';
import KhanBankCard from './KhanbankCard';
import Mobile from './mobile';
import GolomtCard from './golomtCard';
import { getMode } from 'modules/utils';
import AdditionalPayments from './additionalPayments';
import TDBCard from './TDBCard';
import useAmounts from 'lib/useAmounts';
import { useConfigsContext } from 'modules/auth/containers/Configs';

const PaymentMethods = () => {
  const { remainder, checkNotSplitIncluded } = useAmounts();
  const { currentConfig } = useConfigsContext();

  return (
    <div className="row payment-methods">
      {(!checkNotSplitIncluded() || remainder > 0) && (
        <>
          <KhanBankCard />
          <GolomtCard />
          <TDBCard />
          {!!(currentConfig.paymentIds || []).length && <Mobile />}
        </>
      )}
      {getMode() === 'pos' && (
        <>
          {!checkNotSplitIncluded() && <Cash />}
          <AdditionalPayments />
        </>
      )}
    </div>
  );
};

export default PaymentMethods;
