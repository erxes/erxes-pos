import cn from 'classnames';

const Tag = ({ children, status }: any) => {
  return <span className={cn('tag', status)}>{children}</span>;
};

export default Tag;
