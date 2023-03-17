import Button, { ButtonProps } from 'modules/common/ui/Button';
import { useApp } from 'modules/AppContext';
import useIsEditable from 'lib/useIsEditable';
import Input from './Input';
import Minus from 'modules/common/icons/Minus';
import Plus from 'modules/common/icons/Plus';
import cn from 'classnames';
import useFocus from 'lib/useFocus';

interface IProps {
  btnVariant?: ButtonProps['variant'];
  count: number;
  productId?: string;
  _id: string;
  name?: string;
  productImgUrl?: string;
  unitPrice?: number;
  status?: string;
}

const Counter = ({
  btnVariant,
  count,
  productId,
  _id,
  name,
  productImgUrl,
  unitPrice,
  status,
}: IProps) => {
  const { changeItemCount, addItemToCart } = useApp();
  const { paidDate, isDone } = useIsEditable();
  const [ref, setFocus] = useFocus();

  const handleChange = (value: string) => {
    changeItemCount(_id, parseFloat(value) || 0);
  };

  const disabled = !!paidDate || isDone(status);

  const handleStepChange = (plus?: boolean) => {
    if (disabled) return null;
    if (plus && isDone(status)) {
      return addItemToCart({
        _id: productId,
        name,
        productImgUrl,
        unitPrice,
      });
    }

    return plus
      ? changeItemCount(_id, count + 1)
      : changeItemCount(_id, count - 1);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    return setFocus();
  };

  const showButton = (count || '').toString().length < 4;

  return (
    <div className="counter flex-v-center">
      <div ref={ref} tabIndex={0}></div>
      {showButton && (
        <Button
          variant={btnVariant}
          className="minus"
          onClick={() => handleStepChange()}
          disabled={disabled}
          Component="div"
        >
          <Minus />
        </Button>
      )}
      <form
        onSubmit={handleSubmit}
        className={cn('count-wrap', { shrink: showButton })}
      >
        <Input
          className="count"
          type="number"
          step="0.01"
          value={count}
          onChange={handleChange}
          disabled={disabled}
        />
        <input
          type="submit"
          style={{ position: 'absolute', left: -9999, width: 1, height: 1 }}
          tabIndex={-1}
        />
      </form>
      <span className={cn('btn-holder', { shrink: !showButton })}>
        {showButton && (
          <Button
            variant={btnVariant}
            className="plus"
            onClick={() => handleStepChange(true)}
            disabled={!!paidDate}
            Component="div"
          >
            <Plus />
          </Button>
        )}
      </span>
    </div>
  );
};

export default Counter;
