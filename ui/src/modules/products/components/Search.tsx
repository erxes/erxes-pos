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
  const [barcode, setBarcode] = useState(false);
  const { addQuery, query } = useAddQuery();
  const { searchValue: search } = query;

  const active = isActive || open;

  useEffect(() => {
    if (search || search === '') {
      setIsActive(true);
      setSearchValue(search.toString());
    }
  }, [search]);

  useEffect(() => {
    if (query.barcode) {
      query.barcode === 'true' ? setBarcode(true) : setBarcode(false);
    }
  }, [query.barcode]);

  const handleChange = (val: string) => {
    if (val.length - searchValue.length > 1) {
      setBarcode(true);
      setSearchValue(val);
      addQuery({ searchValue: val, barcode: true });
    } else {
      setBarcode(false);
      setSearchValue(val);
    }
  };

  return (
    <form
      className={cn('search flex-0 flex-center', { active })}
      onClick={() => setIsActive(true)}
      onFocus={() => setIsActive(true)}
      onBlur={() => !searchValue && setIsActive(false)}
      onSubmit={(e) => {
        e.preventDefault();
        addQuery({ searchValue, barcode });
      }}
    >
      <div className={cn('smooth-h', { active })}>
        <Input
          name=""
          placeholder="search products"
          value={searchValue}
          onChange={handleChange}
        />
      </div>
      <Button variant="ghost" type="submit">
        <Magnify />
      </Button>
    </form>
  );
};

export default Search;
