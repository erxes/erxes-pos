import Check from 'modules/common/icons/Check';
import Xmark from 'icons/Xmark';
import SpinnerThird from 'icons/SpinnerThird';
import cn from 'classnames';
import type { IRadio } from 'modules/types';

const Radio = ({ mode }: { mode?: IRadio }) => (
  <span className={cn('radio', '-' + mode)}>
    {mode === 'checked' && <Check />}
    {mode === 'error' && <Xmark />}
    {mode === 'loading' && <SpinnerThird />}
  </span>
);

export default Radio;
