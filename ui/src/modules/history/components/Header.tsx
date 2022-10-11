import Header from 'modules/common/Layout/Header';
import Select from 'react-select';
import Button from 'ui/Button';
import { useAddQuery, useRemoveQuery } from 'lib/useQuery';
import Input from 'ui/Input';
import { ORDER_STATUSES } from 'modules/constants';
import { convertDate } from 'modules/utils';

const HistoryHeader = () => {
  const { query, addQuery } = useAddQuery();
  const { removeQuery } = useRemoveQuery();

  const { startDate } = query;

  const today = new Date();

  const getPastDate = (d: any, before: number) =>
    new Date(d.setDate(d.getDate() - before));

  const yesterday = getPastDate(new Date(), 1);
  const weekAgo = getPastDate(new Date(), 7);

  const handleChange = (values: any) => {
    addQuery({ statuses: values.map((v: any) => v.value) });
  };

  const formatForSelect = (arr: string[] = []): any =>
    arr.map((el) => ({
      value: el,
      label: el,
    }));

  const value = (val: any): any => {
    if (!val) return null;
    if (!Array.isArray(val)) return formatForSelect([val]);
    return formatForSelect(val);
  };

  const checkDate = (date1: any, date2: any) =>
    (date1 || '').slice(0, 10) === date2.slice(0, 10);

  const handleDate = (date: any, endDate?: any) => {
    if (checkDate(startDate, convertDate(date))) {
      removeQuery('startDate');
      removeQuery('endDate');
    }
    addQuery({
      startDate: convertDate(date),
      endDate: endDate ? convertDate(endDate) : undefined,
    });
  };

  const handleDateChange = (date: any) =>
    handleDate(new Date(date), getPastDate(new Date(date), -1));

  return (
    <Header>
      {/* <small>
        <b>Захиалгын түүх:</b>
      </small> */}
      {/* <Search onSearch={onSearch} placeHolder="Хайлт хийх" /> */}
      <Select
        isMulti
        options={formatForSelect([...ORDER_STATUSES.ALL, 'paid'])}
        onChange={handleChange}
        value={value(query.statuses)}
        className="-select-statuses"
        placeholder="Tөлөв"
      />
      <Button
        className="filter-btn"
        variant={checkDate(startDate, convertDate(today)) ? 'flat' : 'slim'}
        onClick={() => handleDate(today)}
      >
        Өнөөдөр
      </Button>
      <Button
        className="filter-btn"
        variant={checkDate(startDate, convertDate(yesterday)) ? 'flat' : 'slim'}
        onClick={() => handleDate(yesterday)}
      >
        Өчигдөр
      </Button>
      <Button
        className="filter-btn"
        variant={checkDate(startDate, convertDate(weekAgo)) ? 'flat' : 'slim'}
        onClick={() => handleDate(weekAgo)}
      >
        7 хоног
      </Button>
      <Input className="filter-btn" type="date" onChange={handleDateChange} />
    </Header>
  );
};

export default HistoryHeader;
