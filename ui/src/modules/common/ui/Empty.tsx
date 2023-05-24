import NoData from 'modules/common/icons/NoData';
import Question from 'modules/common/icons/Question';
import cn from 'classnames';
import type { ReactNode } from 'react';

interface IProps {
  text?: string | ReactNode;
  dark?: boolean;
  fill?: boolean;
}

const Empty = ({ text = 'There is no data!', dark, fill = true }: IProps) => {
  return (
    <div
      className={cn('flex-center empty text-center', {
        dark,
        'fill flex-1 overflow-hidden': fill,
      })}
    >
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
