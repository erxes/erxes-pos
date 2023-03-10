import { useCallback, useEffect, useState } from 'react';
import useFocus from 'lib/useFocus';
import cn from 'classnames';
import Magnify from 'modules/common/icons/Magnify';
import Input from 'modules/common/ui/Input';
import Button from 'modules/common/ui/Button';
import { useApp } from 'modules/AppContext';
import useIsEditable from 'lib/useIsEditable';

interface IProps {
  open?: boolean;
}

const Search = ({ open }: IProps) => {
  const [isActive, setIsActive] = useState(false);
  const {
    searchValue,
    setSearch,
    addItemToCart,
    foundItem,
    isBarcode,
    changeIsBarcode,
    changeFoundItem,
  } = useApp();
  const [search, setSearchC] = useState(searchValue);
  const [inputRef, setInputFocus] = useFocus();
  const { paidDate, warning } = useIsEditable();

  const active = isActive || open;

  useEffect(() => {
    const timeOutId = setTimeout(() => setSearch(search), 500);
    return () => clearTimeout(timeOutId);
  }, [search, setSearch]);

  const handleChange = (val: string) => {
    setSearchC(val);
  };

  const handleAdd = useCallback(() => {
    if (paidDate) return warning();
    if (searchValue && foundItem) {
      addItemToCart(foundItem);
      changeIsBarcode(false);
      setSearch('');
      setSearchC('');
      changeFoundItem(null);
    }
  }, [
    paidDate,
    warning,
    searchValue,
    foundItem,
    addItemToCart,
    changeIsBarcode,
    setSearch,
    changeFoundItem,
  ]);

  useEffect(() => {
    if (isBarcode) {
      setSearchC(search);
      handleAdd();
    }
  }, [isBarcode, search, handleAdd]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    !isBarcode && handleAdd();
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
