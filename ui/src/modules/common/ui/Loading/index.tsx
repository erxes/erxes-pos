import cn from 'classnames';

const Loading = ({ className }: { className?: string }) => {
  return (
    <div className={cn('loading fill flex-center', className)}>
      <LoadingDots />
    </div>
  );
};
export const LoadingDots = () => {
  return (
    <span className="loading-dots">
      <span className="dot" key={`dot_1`} />
      <span className="dot" key={`dot_2`} />
      <span className="dot" key={`dot_3`} />
    </span>
  );
};

export default Loading;
