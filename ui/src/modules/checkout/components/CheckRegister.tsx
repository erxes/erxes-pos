import { useApp } from 'modules/AppContext';
import { useUI } from 'ui/context';
import useCheckRegister from 'lib/useCheckRegister';
import Radio from 'modules/common/ui/Radio';
import Input from 'modules/common/ui/Input';
import cn from 'classnames';
import { useEffect } from 'react';
import { NOT_FOUND } from 'modules/constants';

const CheckRegister = () => {
  const { registerNumber, setRegisterNumber } = useApp();
  const { name, loading, error, checkRegister } = useCheckRegister();
  const { latestClickedKey, changeKey } = useUI();

  useEffect(() => {
    checkRegister();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerNumber]);

  const handleChange = (value: string) => {
    const num = value.replaceAll(' ', '');
    if ((!isNaN(parseInt(num)) || num === '') && num.length < 8) {
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
      if (latestClickedKey === 'C') {
        handleChange(registerNumber.slice(0, -1));
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
            mode={loading ? 'loading' : name ? 'checked' : error ? 'error' : ''}
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
        {error && <span className="error caption">{error.message}</span>}
        {name === NOT_FOUND && (
          <span className="error caption">РД буруу байна</span>
        )}
      </div>
    </>
  );
};

export default CheckRegister;
