import Header from 'modules/common/Layout/Header';
import Search from 'modules/common/ui/Search';
import Button from 'ui/Button';
import { useAddQuery } from 'lib/useQuery';
import Calender from 'icons/Calendar';

const HistoryHeader = () => {
  const { query, addQuery } = useAddQuery();

  const onSearch = (val: string) => {
    addQuery({ search: val });
  };

  return (
    <Header>
      <small>
        <b>Захиалгын түүх:</b>
      </small>
      <Search onSearch={onSearch} placeHolder="Хайлт хийх" />
      <Button className="filter-btn">Өнөөдөр</Button>
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
