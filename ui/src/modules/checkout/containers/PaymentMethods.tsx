import { useConfigsContext } from 'modules/auth/containers/Configs';
import Cash from './cash';
import Card from './card';
import Qpay from './qpay';
import AsCard from './asCard';
import Mobile from './mobile';
import Recievable from './recievable';
import { getMode } from 'modules/utils';
import { useApp } from 'modules/AppContext';

const PaymentMethods = () => {
  const { allowReceivable } = useConfigsContext();
  const { type } = useApp();

  if (getMode() === 'pos')
    return (
      <div className="row payment-methods">
        <Cash />
        <Card />
        <Qpay />
        {(allowReceivable || type === 'delivery') && <Recievable />}
        <AsCard />
        <Mobile />
      </div>
    );

  return (
    <div className="row payment-methods">
      <Card />
      <Qpay />
    </div>
  );
};

export default PaymentMethods;
