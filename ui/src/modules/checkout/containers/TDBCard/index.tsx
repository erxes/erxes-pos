import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import { useUI } from 'ui/context';
import TDBLogo from 'icons/TDBLogo';
import useTDB from './useTDB';

const TDBCard = () => {
  const { setModalView, openModal } = useUI();

  const { tdbCardInfo, TDB_CARD } = useTDB();

  if (!tdbCardInfo) return null;

  return (
    <PaymentMethod
      name={TDB_CARD}
      onClick={() => {
        setModalView('TDB_VIEW');
        openModal();
      }}
      btnText="Гүйлгээ хийх"
    >
      <TDBLogo className="-tdb" />
    </PaymentMethod>
  );
};

export default TDBCard;
