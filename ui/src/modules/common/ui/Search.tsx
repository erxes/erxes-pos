import { useState } from 'react';
import cn from 'classnames';
import Input from './Input';
import Button from './Button';
import Magnify from '../icons/Magnify';

const Search = ({
  closeable,
  onSearch,
  placeHolder,
}: {
  closeable?: boolean;
  onSearch: (val: string) => void;
  placeHolder?: string;
}) => {
  const [value, setValue] = useState('');
  const [isActive, setIsActive] = useState(!closeable);
  const active = isActive;
  return (
    <div
      className={cn('search flex-0 flex-center', { active })}
      onClick={() => setIsActive(true)}
      onFocus={() => setIsActive(true)}
      onBlur={() => closeable && setIsActive(false)}
    >
      <div className={cn('smooth-h', { active })}>
        <Input
          placeholder={placeHolder}
          value={value}
          onChange={(val: any) => setValue(val)}
        />
      </div>
      <Button variant="ghost" onClick={() => onSearch(value)}>
        <Magnify />
      </Button>
    </div>
  );
};

export default Search;
