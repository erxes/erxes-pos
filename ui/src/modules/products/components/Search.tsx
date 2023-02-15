import { useEffect, useState } from 'react';
import useFocus from 'lib/useFocus';
import cn from 'classnames';
import Magnify from 'modules/common/icons/Magnify';
import Input from 'modules/common/ui/Input';
import Button from 'modules/common/ui/Button';
import { useApp } from 'modules/AppContext';

interface IProps {
  open?: boolean;
}

const Search = ({ open }: IProps) => {
  const [isActive, setIsActive] = useState(false);
  const { searchValue, setSearch, addItemToCart, foundItem } = useApp();
  const [search, setSearchC] = useState(searchValue);
  const [inputRef, setInputFocus] = useFocus();

  const active = isActive || open;

  useEffect(() => {
    const timeOutId = setTimeout(() => setSearch(search), 500);
    return () => clearTimeout(timeOutId);
  }, [search, setSearch]);

  useEffect(() => {
    setSearchC(searchValue);
  }, [searchValue]);

  const handleChange = (val: string) => {
    setSearchC(val);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (searchValue && foundItem) {
      addItemToCart(foundItem);
      setSearch('');
      setSearchC('');
    }
  };

  return (
    <form
      className={cn('search flex-0 flex-center', { active })}
      onClick={() => {
        setIsActive(true);
        setInputFocus();
      }}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      onSubmit={handleSubmit}
    >
      <div className={cn('smooth-h', { active })}>
        <Input
          name=""
          placeholder="search products"
          value={search}
          onChange={handleChange}
          ref={inputRef}
        />
      </div>
      <Button variant="ghost" type="submit">
        <Magnify />
      </Button>
    </form>
  );
};

export default Search;
