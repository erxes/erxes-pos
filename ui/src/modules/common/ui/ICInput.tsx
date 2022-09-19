/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, memo, useRef, createRef } from 'react';
import Input from './Input';
import { useUI } from './context';

const ICInput = ({
  inputRegExp = /^[0-9]$/,
  amount = 7,
  handleOutputString,
}: any) => {
  const [characterArray, setCharacterArray] = useState<any[]>(
    Array(amount).fill('')
  );
  const [elRefs, setElRefs] = useState<any[]>([]);
  const [selectedInput, setSelectedInput] = useState<any>(0);
  const didMount = useRef(false);
  const { latestClickedKey, changeKey } = useUI();

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

  const setModuleOutput = () => {
    setCharacterArray((arr: any[]) => {
      const updatedCharacters = arr.map((character, number) => {
        return elRefs[number].current.value;
      });
      return updatedCharacters;
    });
  };

  const handleChange = ({ target }: any) => {
    if (target.value.match(inputRegExp)) {
      focusNextChar(target);
      setModuleOutput();
    } else {
      target.value =
        characterArray[Number(target.name.replace('input', ''))] || '';
    }
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
      setSelectedInput(Number(el.name.replace('input', '')));
    }, 0);
  };

  useEffect(() => {
    if ((selectedInput + '').match(inputRegExp)) {
      setTimeout(function () {
        elRefs[selectedInput] && elRefs[selectedInput].current.select();
      }, 0);
    }
  }, [selectedInput]);

  useEffect(() => {
    // add or remove refs
    setElRefs((elRefs) =>
      Array(amount)
        .fill(null)
        .map((_, i) => elRefs[i] || createRef())
    );
  }, [amount]);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    setSelectedInput((prev: number) => {
      if (latestClickedKey) {
        if (latestClickedKey === 'C') {
          return prev === 0 ? 0 : prev - 1;
        }
        return prev === amount - 1 ? prev : prev + 1;
      }
    });
    changeKey('');

    const str = characterArray.join('');
    console.log(str);
    str && handleOutputString(str);
  }, [characterArray]);

  useEffect(() => {
    if (latestClickedKey) {
      if (latestClickedKey === 'C') {
        setCharacterArray((prev: any[]) => {
          let updated = prev.slice();
          updated[selectedInput] = '';
          return updated;
        });
        return;
      }
      setCharacterArray((prev: any[]) => {
        let updated = prev.slice();
        updated[selectedInput] = latestClickedKey;
        return updated;
      });
    }
  }, [latestClickedKey]);
  return (
    <div className="input-ic flex-v-center">
      {Array.from({ length: amount }).map((_, idx) => (
        <Input
          key={idx}
          placeholder="*"
          icChild
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          name={'input' + idx}
          ref={elRefs[idx]}
          value={characterArray[idx]}
        />
      ))}
    </div>
  );
};

export default memo(ICInput);
