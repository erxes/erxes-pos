import Button from 'ui/Button';
import { useApp } from 'modules/AppContext';
import useIsDisabled from 'lib/useIsDisabled';
import { useConfigsContext } from 'modules/auth/containers/Configs';

const typeTextDef: any = {
  eat: 'Зааланд',
  take: 'Авч явах',
  delivery: 'Хүргэлтээр',
  loss: 'Хорогдол',
  spend: 'Зарлагадсан',
  reject: 'Гологдол',
};

const Deliver = () => {
  const { type, setType } = useApp();
  const { currentConfig } = useConfigsContext();
  const disabled = useIsDisabled();
  const typeText: any = {};

  const allowTypes = (currentConfig || {}).allowTypes
  for (const type of allowTypes) {
    typeText[type] = typeTextDef[type]
  }

  const handleClick = () => {
    const idx = allowTypes.indexOf(type);
    if (idx >= allowTypes.length - 1) {
      return setType(allowTypes[0]);
    }
    return setType(allowTypes[idx + 1]);
  };
  return (
    <Button className="take" onClick={handleClick} disabled={disabled}>
      {typeText[type]}
    </Button>
  );
};

export default Deliver;
