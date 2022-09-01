import { useState } from 'react';
import cn from 'classnames';
import Magnify from 'modules/common/icons/Magnify';
import Input from 'modules/common/ui/Input';
import Button from 'modules/common/ui/Button';

interface IProps {
  open?: boolean;
}

const Search = ({ open }: IProps) => {
  const [isActive, setIsActive] = useState(false);
  const active = isActive || open;
  return (
    <div
      className={cn('search flex-0 flex-center', { active })}
      onClick={() => setIsActive(true)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      <div className={cn('smooth-h', { active })}>
        <Input placeholder="search products" />
      </div>
      <Button variant="ghost">
        <Magnify />
      </Button>
    </div>
  );
};

export default Search;
