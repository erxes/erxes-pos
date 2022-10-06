import Button from 'ui/Button';
import { useApp } from 'modules/AppContext';
import useIsDisabled from 'lib/useIsDisabled';

const typeText: any = {
  eat: 'Зааланд',
  take: 'Авч явах',
  delivery: 'Хүргэлтээр',
};

const Deliver = () => {
  const { type, setType } = useApp();
  const disabled = useIsDisabled();

  const handleClick = () => {
    const arr = Object.keys(typeText);
    const idx = arr.indexOf(type);
    if (idx === 2) {
      return setType(arr[0]);
    }
    return setType(arr[idx + 1]);
  };
  return (
    <Button className="take" onClick={handleClick} disabled={disabled}>
      {typeText[type]}
    </Button>
  );
};

export default Deliver;
