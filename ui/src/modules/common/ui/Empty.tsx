import NoData from 'modules/common/icons/NoData';
import Question from 'modules/common/icons/Question';

interface IProps {
  text?: string;
}

const Empty = ({ text = 'There is no data!' }: IProps) => {
  return (
    <div className="flex-center fill empty">
      <div>
        <Question className="qs qs-1" />
        <Question className="qs qs-2" />
        <NoData />
        <p className="text-center">{text}</p>
      </div>
    </div>
  );
};

export default Empty;
