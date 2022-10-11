import { useState, useEffect } from 'react';
import { useAddQuery } from 'lib/useQuery';
import cn from 'classnames';
import Magnify from 'modules/common/icons/Magnify';
import Input from 'modules/common/ui/Input';
import Button from 'modules/common/ui/Button';

interface IProps {
  open?: boolean;
}

const Search = ({ open }: IProps) => {
  const [isActive, setIsActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { addQuery, query } = useAddQuery();
  const active = isActive || open;

  useEffect(() => {
    setIsActive(true);
    query.searchValue && setSearchValue(query.searchValue.toString());
  }, [query.searchValue]);

  return (
    <div
      className={cn('search flex-0 flex-center', { active })}
      onClick={() => setIsActive(true)}
      onFocus={() => setIsActive(true)}
      onBlur={() => !searchValue && setIsActive(false)}
    >
      <div className={cn('smooth-h', { active })}>
        <Input
          placeholder="search products"
          value={searchValue}
          onChange={(val: string) => setSearchValue(val)}
        />
      </div>
      <Button variant="ghost" onClick={() => addQuery({ searchValue })}>
        <Magnify />
      </Button>
    </div>
  );
};

export default Search;
