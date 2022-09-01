import Button, { ButtonProps } from 'modules/common/ui/Button';
import { useApp } from 'modules/AppContext';
import Input from './Input';
import Minus from 'modules/common/icons/Minus';
import Plus from 'modules/common/icons/Plus';

interface IProps {
  btnVariant?: ButtonProps['variant'];
  count: number;
  _id: string;
}

const Counter = ({ btnVariant, _id, count }: IProps) => {
  const { changeItemCount } = useApp();
  // const [countFormat, setCountFormat] = useState('1');

  const handleChange = (value: string) => {
    changeItemCount(_id, parseInt(value));
    // changeValue(parseInt((value || '0').replace(/\s/g, '')));
    //   setCount(parseInt(value || '0'));
  };

  const handleStepChange = (plus?: boolean) =>
    plus ? changeItemCount(_id, count + 1) : changeItemCount(_id, count - 1);

  return (
    <div className="counter flex-v-center">
      <Button
        variant={btnVariant}
        className="minus"
        onClick={() => handleStepChange()}
      >
        <Minus />
      </Button>
      <div className="count-wrap">
        <Input
          className="count"
          type="number"
          value={count}
          onChange={handleChange}
        />
      </div>
      <Button
        variant={btnVariant}
        className="plus"
        onClick={() => handleStepChange(true)}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default Counter;
