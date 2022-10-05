import Button from 'ui/Button';
import { useApp } from 'modules/AppContext';
import useIsDisabled from 'lib/useIsDisabled';

const Deliver = () => {
  const { delivery } = useApp();
  const disabled = useIsDisabled();
  return (
    <Button className="take" onClick={delivery} disabled={disabled}>
      Авч явах
    </Button>
  );
};

export default Deliver;
