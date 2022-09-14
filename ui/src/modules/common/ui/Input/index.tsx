import { FC, InputHTMLAttributes, useRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onChange?: (...args: any[]) => any;
  icChild?: boolean;
  ref?: any;
}

const Input: FC<InputProps> = (props) => {
  const { className, children, onChange, icChild, ref, ...rest } = props;

  const handleOnChange = (e: any) => {
    if (onChange) {
      icChild ? onChange(e) : onChange(e.target.value);
    }
    return null;
  };

  return (
    <input
      className={className}
      onChange={handleOnChange}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      ref={ref}
      {...rest}
    />
  );
};

export default Input;
