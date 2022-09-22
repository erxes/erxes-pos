import NoData from 'modules/common/icons/NoData';
import Question from 'modules/common/icons/Question';
import cn from 'classnames';

interface IProps {
  text?: string;
  dark?: boolean;
}

const Empty = ({ text = 'There is no data!', dark }: IProps) => {
  return (
    <div className={cn('flex-center fill empty', { dark })}>
      <div>
        <Question className="qs qs-1" />
        <Question className="qs qs-2" />
        <NoData dark={dark} />
        <p className="text-center">{text}</p>
      </div>
    </div>
  );
};

export default Empty;
