import { useConfigsContext } from 'modules/auth/containers/Configs';
import Payment from './Payment';

const AdditionalPayments = () => {
  const { paymentTypes } = useConfigsContext();
  console.log(paymentTypes);
  return (
    <>
      {(paymentTypes || []).filter(pt => !['khaanCard', 'golomtCard'].includes(pt.type)).map((payment) => (
        <Payment key={payment._id} {...payment} />
      ))}
    </>
  );
};

export default AdditionalPayments;
