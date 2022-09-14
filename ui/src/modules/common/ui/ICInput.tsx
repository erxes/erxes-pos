import { useState, useEffect, memo, useRef, useMemo, forwardRef } from 'react';
import Input from './Input';

const InputBox = (props: any) => {
  const { handleChange, handleKeyDown, handleFocus, idx, value } = props;

  const onChange = (e: any) => handleChange(e, idx);

  return (
    <Input
      placeholder="*"
      icChild
      onChange={onChange}
      value={value}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
    />
  );
};

const ICInput = ({
  inputRegExp = /^[0-9]$/,
  amount = 7,
  handleOutputString,
}: any) => {
  const [characterArray, setCharacterArray] = useState<any[]>(
    Array(amount).fill(null)
  );

  const focusNextChar = (target: any) => {
    if (target.nextElementSibling !== null) {
      target.nextElementSibling.focus();
    }
  };

  const focusPrevChar = (target: any) => {
    if (target.previousElementSibling !== null) {
      target.previousElementSibling.focus();
    }
  };

  const handleChange = ({ target }: any, idx: number) => {
    if (target.value.match(inputRegExp)) {
      focusNextChar(target);
      setModuleOutput(target.value, idx);
    } else {
      setModuleOutput('', idx);
    }
  };

  const setModuleOutput = (value: any, idx: any) => {
    setCharacterArray((arr: any[]) => {
      const updatedCharacters = arr.slice();
      updatedCharacters[idx] = value;
      return updatedCharacters;
    });
  };

  const handleKeyDown = ({ target, key }: any) => {
    if (key === 'Backspace') {
      if (target.value === '' && target.previousElementSibling !== null) {
        target.previousElementSibling.value = '';
        focusPrevChar(target);
      } else {
        target.value = '';
      }
      setModuleOutput();
    } else if (key === 'ArrowLeft') {
      focusPrevChar(target);
    } else if (key === 'ArrowRight' || key === ' ') {
      focusNextChar(target);
    }
  };

  const handleFocus = ({ target }: any) => {
    var el = target;
    // In most browsers .select() does not work without the added timeout.
    setTimeout(function () {
      el.select();
    }, 0);
  };

  useEffect(() => {
    const str = characterArray.join('');
    str && handleOutputString(str);
  }, [characterArray]);

  return (
    <div className="input-ic flex-v-center">
      {Array.from({ length: amount }).map((_, idx) => (
        <InputBox
          key={idx}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
          handleFocus={handleFocus}
          idx={idx}
          value={characterArray[idx]}
        />
      ))}
    </div>
  );
};

export default memo(ICInput);
