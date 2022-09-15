import cn from 'classnames';
import Key from './Key';

const KeyBoard = ({ touch }: { touch?: boolean }) => {
  return (
    <div className={cn('keyboard', { touch })}>
      <div className="row">
        {Array.from({ length: 9 }).map((_, idx) => (
          <Key key={idx} value={idx + 1 + ''} touch />
        ))}
        <Key value={'0'} touch />
        {!touch && <Key value="00" />}
        <Key value="C" touch />
      </div>
    </div>
  );
};

export default KeyBoard;
