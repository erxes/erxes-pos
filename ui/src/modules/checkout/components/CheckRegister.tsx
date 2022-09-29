import { useApp } from 'modules/AppContext';
import useCheckRegister from 'lib/useCheckRegister';
import Radio from 'modules/common/ui/Radio';
import Input from 'modules/common/ui/Input';
import cn from 'classnames';
import { useEffect } from 'react';

const CheckRegister = () => {
  const { registerNumber, setRegisterNumber } = useApp();
  const { name, loading, error, checkRegister } = useCheckRegister();

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
              {name && <div className="name">{name}</div>}
            </div>
          </div>
        </div>
        {error && <span className="error caption">{error.message}</span>}
      </div>
    </>
  );
};

export default CheckRegister;
