import Header from 'modules/common/Layout/Header';
import Select from 'react-select';
import Button from 'ui/Button';
import { useAddQuery } from 'lib/useQuery';
import Calender from 'icons/Calendar';
import { ORDER_STATUSES } from 'modules/constants';

const HistoryHeader = () => {
  const { query, addQuery } = useAddQuery();

  const onSearch = (val: string) => {
    addQuery({ search: val });
  };

  return (
    <Header>
      {/* <small>
        <b>Захиалгын түүх:</b>
      </small> */}
      {/* <Search onSearch={onSearch} placeHolder="Хайлт хийх" /> */}
      <Select
        isMulti
        options={[...ORDER_STATUSES.ALL, 'paid'].map((el) => ({
          value: el,
          label: el,
        }))}
      />
      <Button className="filter-btn" variant="slim">
        Өнөөдөр
      </Button>
      <Button className="filter-btn" variant="slim">
        Өчигдөр
      </Button>
      <Button className="filter-btn" variant="slim">
        7 хоног
      </Button>
      <Button className="filter-btn" variant="slim">
        <Calender />
      </Button>
    </Header>
  );
};

export default HistoryHeader;
