import Button from 'ui/Button';
import { useApp } from 'modules/AppContext';
import useIsDisabled from 'lib/useIsDisabled';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import Select from 'ui/Select';

const typeTextDef: any = {
  eat: 'Зааланд',
  take: 'Авч явах',
  delivery: 'Хүргэлтээр',
  loss: 'Хорогдол',
  spend: 'Зарлагадсан',
  reject: 'Гологдол',
  before: 'Урьдчилсан',
};

const Deliver = () => {
  const { type, setType } = useApp();
  const { currentConfig } = useConfigsContext();
  const disabled = useIsDisabled();
  const typeText: any = {};

  const allowTypes = [...(currentConfig || {}).allowTypes, 'pre-order'];
  for (const type of allowTypes) {
    typeText[type] = typeTextDef[type];
  }

  if (allowTypes.length > 3) {
    return (
      <Select
        className="order-type"
        value={type}
        onChange={(value) => setType(value)}
        disabled={disabled}
      >
        {allowTypes.map((type: string) => (
          <option key={type} value={type}>
            {typeText[type]}
          </option>
        ))}
      </Select>
    );
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
