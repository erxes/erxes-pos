import { useState } from 'react';
import Button from 'ui/Button';
import { IFilter } from '../containers/Orders';
import { setLocal } from 'modules/utils';
// import Select from 'react-select';
// import { ORDER_STATUSES } from 'modules/constants';
const Filter = ({
  setFilter,
  filter,
}: {
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  filter: IFilter;
}) => {
  const [isPaid, setIsPaid] = useState<boolean | undefined>(filter.isPaid);
  const [sortBy, setSortBy] = useState<string>(filter.sortField);
  const [sort, setSort] = useState<number>(filter.sortDirection);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = {
      isPaid,
      sortField: sortBy,
      sortDirection: sort,
      
    };
    // setFilter(value);
    // save to local storage
    setLocal('kitchen-filter', JSON.stringify(value));
  };

  const handleIsPaid = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setIsPaid(value === 'true' ? true : value === 'false' ? false : undefined);
  };
  const handleSelectStatus = (values: any) => {
    console.log(values);
  };

  return (
    <div className="flex-0 kitchen-filter flex-h-between">
      <b>Filter:</b>
      <form
        className="flex-v-center kitchen-filter-form"
        onSubmit={handleSubmit}
      >
        <div className="kitchen-filter-form-item">
          <label htmlFor="isPaid">Төлөв:</label>
          {/* <Select
            isMulti
            className="react-select"
            onChange={handleSelectStatus}
            options={ ORDER_STATUSES.ACTIVE.map((status) => ({
              value: status,
              label: status,
            }))}
            value={(filter.statuses || []).map((status) => ({
              value: status,
              label: status,
            }))}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: 'gray',
                primary: 'black',
              },
            })}
          /> */}
        </div>
        <div className="kitchen-filter-form-item">
          <label htmlFor="isPaid">Төлбөр төлсөн эсэх:</label>
          <select
            name="isPaid"
            id="isPaid"
            onChange={handleIsPaid}
            value={'' + isPaid === 'undefined' ? undefined : isPaid + ''}
          >
            <option value={undefined}>All</option>
            <option value={'true'}>paid</option>
            <option value={'false'}>unpaid</option>
          </select>
        </div>
        <div className="kitchen-filter-form-item">
          <label htmlFor="sortBy">Ангилах огноо:</label>
          <select
            name="sortBy"
            id="sortBy"
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
          >
            <option value="createdAt">Created At</option>
            <option value="modifiedAt">Modified At</option>
          </select>
        </div>
        <div className="kitchen-filter-form-item">
          <label htmlFor="sort">Ангилах чиглэл:</label>
          <select
            name="sort"
            id="sort"
            onChange={(e) => setSort(parseInt(e.target.value))}
            value={sort + ''}
          >
            <option value="1">old to new</option>
            <option value="-1">new to old</option>
          </select>
        </div>
        <Button type="submit">Apply</Button>
      </form>
    </div>
  );
};

export default Filter;
