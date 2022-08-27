import Key from './Key';

const KeyBoard = () => {
  return (
    <div className=" keyboard">
      <div className="row">
        {Array.from({ length: 9 }).map((_, idx) => (
          <Key key={idx} value={idx + 1} />
        ))}
        <Key value={0} />
        <Key value="00" />
        <Key value="C" />
      </div>
    </div>
  );
};

export default KeyBoard;
