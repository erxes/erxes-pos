import Header from 'modules/common/Layout/Header';
import Select from 'ui/ReactSelect';
import Button from 'ui/Button';
import Input from 'ui/Input';
import { useAddQuery, useRemoveQuery } from 'lib/useQuery';
import { useRouter } from 'next/router';
import { ORDER_STATUSES } from 'modules/constants';
import dayjs, { Dayjs } from 'dayjs';

const HistoryHeader = () => {
  const { query, addQuery } = useAddQuery();
  const { startDate, endDate, searchValue } = query;
  const { removeQuery } = useRemoveQuery();
  const router = useRouter();
  const today = dayjs().format('YYYYMMDD');
  const yesterday = dayjs().subtract(1, 'day').format('YYYYMMDD');
  const weekAgo = dayjs().subtract(6, 'day');

  const handleStatusesChange = (values: any) => {
    addQuery({ statuses: values.map((v: any) => v.value) });
  };

  const formatForSelect = (arr: string[] = []): any =>
    arr.map((el) => ({
      value: el,
      label: el,
    }));

  const statusesValue = (val: any): any => {
    if (!val) return null;
    if (!Array.isArray(val)) return formatForSelect([val]);
    return formatForSelect(val);
  };

  const formatDate = (date: any, when?: string) =>
    `${date.format('YYYY-MM-DD')} ${when === 'end' ? '23:59:59' : '00:00:00'}`;

  const handleDate = (startDate: Dayjs, endDate?: Dayjs) => {
    if (!!startDate.isValid()) {
      addQuery({
        searchValue: '',
        startDate: formatDate(startDate),
        endDate: dayjs((endDate || '').toString()).isValid()
          ? formatDate(endDate, 'end')
          : undefined,
      });
    }
  };

  const handleToday = () => {
    if (query.searchValue === today) {
      return removeQuery('searchValue');
    }
    addQuery({ startDate: '', endDate: '', searchValue: today });

    // const { startDate, endDate } = query;

    // if (startDate === formatDate(dayjs())) {
    //   removeQuery('startDate');
    //   removeQuery('endDate');
    //   return;
    // }
    // return handleDate(dayjs(), dayjs());
  };

  const handleYesterday = () => {
    if (searchValue === yesterday) {
      return removeQuery('searchValue');
    }
    addQuery({ startDate: '', endDate: '', searchValue: yesterday });

    // TODO: ?
    // const { startDate, endDate } = query;
    // const yesterday = dayjs().subtract(1, 'day');
    // if (startDate === formatDate(yesterday)) {
    //   removeQuery('startDate');
    //   removeQuery('endDate');
    //   return;
    // }
    // return handleDate(yesterday, yesterday);
  };

  const isWeekActive = (weekAgo: Dayjs) => {
    return (
      startDate === formatDate(weekAgo) &&
      endDate === formatDate(dayjs(), 'end')
    );
  };

  const handleWeek = () => {
    if (isWeekActive(weekAgo)) {
      removeQuery('startDate');
      removeQuery('endDate');
      return;
    }
    return handleDate(weekAgo, dayjs());
  };

  const handleDateChange = (value: string) => {
    router.push({
      pathname: router.pathname,
      query: { searchValue: value.replaceAll('-', '') },
    });
  };

  const checkActive = (isActive: boolean) => (isActive ? 'flat' : 'slim');

  const searchStr = (searchValue || '').toString();

  const dateValue = searchValue
    ? searchStr.slice(0, 4) +
      '-' +
      searchStr.slice(4, 6) +
      '-' +
      searchStr.slice(6, 8)
    : '';

  return (
    <Header>
      {/* <small className="-result">
        <b>Захиалгын түүх: 24 </b>
      </small> */}
      {/* <Search onSearch={onSearch} placeHolder="Хайлт хийх" /> */}
      <Select
        isMulti
        options={formatForSelect([...ORDER_STATUSES.ALL, 'paid'])}
        onChange={handleStatusesChange}
        value={statusesValue(query.statuses)}
        className="-select-statuses"
        placeholder="Tөлөв"
      />
      <Button
        className="filter-btn"
        onClick={handleToday}
        variant={checkActive(searchValue === today)}
      >
        Өнөөдөр
      </Button>
      <Button
        className="filter-btn"
        onClick={handleYesterday}
        variant={checkActive(searchValue === yesterday)}
      >
        Өчигдөр
      </Button>
      <Button
        className="filter-btn"
        onClick={handleWeek}
        variant={checkActive(isWeekActive(weekAgo))}
      >
        7 хоног
      </Button>
      <Input
        className="filter-btn"
        type="date"
        onChange={handleDateChange}
        value={dateValue}
      />
    </Header>
  );
};

export default HistoryHeader;
