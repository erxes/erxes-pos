/* eslint-disable react-hooks/exhaustive-deps */
import { useApp } from 'modules/AppContext';
import { useUI } from 'ui/context';
import useCheckRegister from 'lib/useCheckRegister';
import Radio from 'ui/Radio';
import Input from 'ui/Input';
import cn from 'classnames';
import { useEffect } from 'react';
import { NOT_FOUND } from 'modules/constants';
import KeyBoard from './KeyBoard';
import Button from 'ui/Button';

const CheckRegister = () => {
  const { registerNumber, setRegisterNumber } = useApp();
  const { name, loading, error, checkRegister } = useCheckRegister();
  const { latestClickedKey, changeKey } = useUI();

  const handleChange = (value: string) => {
    const num = value.replaceAll(' ', '');
    if (num.length < 11) {
      setRegisterNumber(num);
    }
  };
  const formatRegister = (registerNumber: string) => {
    if (registerNumber.length < 5) {
      return registerNumber;
    }
    const arr = registerNumber.split('').reverse();
    const str1 = arr.slice(0, 4).reverse();
    const str2 = arr.slice(4).reverse();
    return [...str2, ' ', ...str1].join('');
  };

  useEffect(() => {
    changeKey('');
  }, [registerNumber]);

  useEffect(() => {
    if (latestClickedKey) {
      if (latestClickedKey === 'CE') {
        handleChange(registerNumber.slice(0, -1));
        return;
      }
      if (latestClickedKey === 'C') {
        handleChange('');
        return;
      }
      handleChange(registerNumber + latestClickedKey);
    }
  }, [latestClickedKey]);
  return (
    <>
      <div
        className={cn('register flex-h-between', {
          verified: !!name,
          loading,
        })}
      >
        <div className="flex-center">
          <Radio
            mode={
              loading
                ? 'loading'
                : error || name === NOT_FOUND
                ? 'error'
                : name
                ? 'checked'
                : ''
            }
          />
          <div>
            <span className="caption">
              <b>Байгууллагын РД</b>
            </span>
            <div className="flex-v-center">
              <Input
                placeholder="000 0000"
                onChange={handleChange}
                value={formatRegister(registerNumber)}
                disabled={loading}
              />
              {name && name !== NOT_FOUND && <div className="name">{name}</div>}
            </div>
          </div>
        </div>
        <Button onClick={checkRegister}>Шалгах</Button>
        {error && <span className="error caption">{error.message}</span>}
        {name === NOT_FOUND && (
          <span className="error caption">РД буруу байна</span>
        )}
      </div>
      <div className="smooth active">
        <KeyBoard />
      </div>
    </>
  );
};

export default CheckRegister;
