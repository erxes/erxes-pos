import { useState, useEffect } from 'react';
import useFocus from 'lib/useFocus';
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
  const [changeDates, setChangeDates] = useState<number[]>([]);
  const [searchV, setSearch] = useState('');
  const [inputRef, setInputFocus] = useFocus();
  const { addQuery, query } = useAddQuery();
  const { searchValue: search } = query;

  const active = isActive || open;

  useEffect(() => {
    if (search || search === '') {
      setIsActive(true);
      setSearch(search.toString());
    }
  }, [search]);

  const handleChange = (val: string) => {
    const date = new Date();
    !!val
      ? setChangeDates((current) => [...current, date.getTime()])
      : setChangeDates([]);
    setSearch(val);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addQuery({
      searchValue: searchV.split('_')[0],
      barcode:
        searchV.length > 4 &&
        (changeDates[changeDates.length - 1] - changeDates[0]) /
          changeDates.length <
          50,
      manufacturedDate: searchV.split('_')[1],
    });
    setChangeDates([]);
  };

  return (
    <form
      className={cn('search flex-0 flex-center', { active })}
      onClick={() => {
        setIsActive(true);
        setInputFocus();
      }}
      onFocus={() => setIsActive(true)}
      onBlur={() => !searchV && setIsActive(false)}
      onSubmit={handleSubmit}
    >
      <div className={cn('smooth-h', { active })}>
        <Input
          name=""
          placeholder="search products"
          value={searchV}
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
