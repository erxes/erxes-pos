import type { FC, InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  htmlFor?: string;
}

const Checkbox: FC<CheckboxProps> = (props) => {
  const { htmlFor, onChange, ...rest } = props;

  const handleChange = (e: any) => {
    if (onChange) {
      onChange(e.target.checked);
    }
    return null;
  };

  return (
    <label htmlFor={htmlFor} className="checkbox">
      <input type="checkbox" {...rest} onChange={handleChange} />
      <span className="checkmark"></span>
    </label>
  );
};

export default Checkbox;
