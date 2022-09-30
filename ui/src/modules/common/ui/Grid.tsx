const Grid = ({ data, Component }: any) => {
  const constant = 3;

  const renderCol = (idx: number) => {
    return (
      <>
        {data
          .filter((_: any, i: number) => i % constant === idx)
          .map((item: any) => (
            <Component {...item} key={item._id} />
          ))}
      </>
    );
  };

  return (
    <div className="row">
      {Array.from({ length: constant }).map((_, idx) => (
        <div className={'col-' + 12 / constant} key={idx}>
          {renderCol(idx)}
        </div>
      ))}
    </div>
  );
};

export default Grid;
