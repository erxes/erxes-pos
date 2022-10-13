import { useConfigsContext } from 'modules/auth/containers/Configs';
import Cash from './cash';
import Card from './card';
import Qpay from './qpay';
import Recievable from './recievable';
import { getMode } from 'modules/utils';
import { useApp } from 'modules/AppContext';

const PaymentMethods = () => {
  const { allowReceivable } = useConfigsContext();
  const { type } = useApp();

  return (
    <div className="row payment-methods">
      {getMode() === 'pos' && <Cash />}
      <Card />
      <Qpay />
      {getMode() === 'pos' && (allowReceivable || type === 'delivery') && (
        <Recievable />
      )}
    </div>
  );
};

export default PaymentMethods;
