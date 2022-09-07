import Button from 'ui/Button';
import { useApp } from 'modules/AppContext';

const Deliver = () => {
  const { delivery, cart } = useApp();
  return (
    <Button
      className="take"
      onClick={delivery}
      disabled={!cart || !cart.length}
    >
      Авч явах
    </Button>
  );
};

export default Deliver;
