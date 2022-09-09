import { useCheckoutContext } from '../context';
import Button from 'modules/common/ui/Button';

const Key = ({ value }: { value: number | string }) => {
  const { card, setCardValue } = useCheckoutContext();

  const handleClick = () => {
    if (value === 'C') {
      return setCardValue(card.toString().slice(0, -1));
    }
    return setCardValue(card + '' + value);
  };

  return (
    <div className="col-3 key">
      <Button variant="slim" onClick={handleClick}>
        <h6>{value}</h6>
      </Button>
    </div>
  );
};

export default Key;
