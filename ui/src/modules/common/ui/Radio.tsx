import Check from 'modules/common/icons/Check';
import Xmark from 'icons/Xmark';
import SpinnerThird from 'icons/SpinnerThird';
import cn from 'classnames';

const Radio = ({
  mode,
}: {
  mode?: 'checked' | 'error' | 'loading' | '' | false;
}) => (
  <span className={cn('radio', '-' + mode)}>
    {mode === 'checked' && <Check />}
    {mode === 'error' && <Xmark />}
    {mode === 'loading' && <SpinnerThird />}
  </span>
);

export default Radio;
