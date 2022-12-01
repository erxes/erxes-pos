import { useState } from 'react';
import cn from 'classnames';
import Input, { InputProps } from './Input';
import Button from './Button';
import Magnify from '../icons/Magnify';

interface SearchProps {
  closeable?: boolean;
  onSearch?: (val: string) => void;
  placeHolder?: string;
  containerCn?: string;
}

export const SearchComp = ({
  active = true,
  containerCn,
  value,
  onSearch,
  onClick,
  onFocus,
  onBlur,
  ...rest
}: any) => (
  <form
    className={cn('search flex-0 flex-center', containerCn, { active })}
    onClick={onClick && onClick}
    onFocus={onFocus && onFocus}
    onBlur={onBlur && onBlur}
    onSubmit={(e) => {
      e.preventDefault();
      onSearch && onSearch(value);
    }}
  >
    <div className={cn('smooth-h', { active })}>
      <Input value={value} {...rest} name="search" />
    </div>
    <Button variant="ghost" type="submit">
      <Magnify />
    </Button>
  </form>
);

const Search = ({ closeable, ...rest }: SearchProps & InputProps) => {
  const [value, setValue] = useState('');
  const [active, setActive] = useState(!closeable);

  const updatedProps = {
    value,
    onChange: (val: any) => setValue(val),
    active: active || !!value,
    onClick: () => setActive(true),
    onFocus: () => setActive(true),
    onBlur: () => closeable && setActive(false),
    ...rest,
  };

  return <SearchComp {...updatedProps} />;
};

export default Search;
