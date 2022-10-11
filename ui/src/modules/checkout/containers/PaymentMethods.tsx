import { useConfigsContext } from 'modules/auth/containers/Configs';
import Cash from './cash';
import Card from './card';
import Qpay from './qpay';
import Recievable from './recievable';
import { getMode } from 'modules/utils';

const PaymentMethods = () => {
  const { allowReceivable } = useConfigsContext();

  return (
    <div className="row payment-methods">
      {getMode() === 'pos' && <Cash />}
      <Card />
      <Qpay />
      {getMode() === 'pos' && allowReceivable && <Recievable />}
    </div>
  );
};

export default PaymentMethods;
