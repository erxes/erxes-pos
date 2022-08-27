import type { SelectHTMLAttributes } from 'react';
import ChevronDown from 'icons/ChevronDown';
import Loading from '../Loading';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  onChange?: (...args: any[]) => any;
  loading?: boolean;
  label?: string;
}

const Select = ({ onChange, children, loading, label }: SelectProps) => {
  const handleOnChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value);
    }
    return null;
  };
  return (
    <div className="select-wrap">
      {label && <small>{label}</small>}
      <select onChange={handleOnChange} disabled={loading}>
        {children}
      </select>
      <ChevronDown />
      {loading && <Loading />}
    </div>
  );
};

export default Select;
