import Button, { ButtonProps } from 'modules/common/ui/Button';
import { useApp } from 'modules/AppContext';
import type { ICartItem } from 'modules/types';
import useIsEditable from 'lib/useIsEditable';
import Input from './Input';
import Minus from 'modules/common/icons/Minus';
import Plus from 'modules/common/icons/Plus';
import cn from 'classnames';

interface IProps extends ICartItem {
  btnVariant?: ButtonProps['variant'];
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
}: any) => {
  const { changeItemCount, addItemToCart } = useApp();
  const { paidDate, checkStatus } = useIsEditable();

  const handleChange = (value: string) => {
    changeItemCount(_id, parseFloat(value));
  };

  const handleStepChange = (plus?: boolean) => {
    if (plus && checkStatus(status)) {
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

  const disabled = !!paidDate || checkStatus(status);

  const showButton = count.toString().length < 4;

  return (
    <div className="counter flex-v-center">
      {showButton && (
        <Button
          variant={btnVariant}
          className="minus"
          onClick={() => handleStepChange()}
          disabled={disabled}
        >
          <Minus />
        </Button>
      )}
      <div className={cn('count-wrap', { shrink: showButton })}>
        <Input
          className="count"
          type="number"
          value={count}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
      <span className={cn('btn-holder', { shrink: !showButton })}>
        {showButton && (
          <Button
            variant={btnVariant}
            className="plus"
            onClick={() => handleStepChange(true)}
            disabled={!!paidDate}
          >
            <Plus />
          </Button>
        )}
      </span>
    </div>
  );
};

export default Counter;
