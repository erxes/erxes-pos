import { useAutoAnimate } from '@formkit/auto-animate/react';

const Col = ({ idx, data, Component, constant }: any) => {
  const [animationParent] = useAutoAnimate<HTMLDivElement>();

  return (
    <div className={'col-' + 12 / constant} ref={animationParent}>
      {data
        .filter((_: any, i: number) => i % constant === idx)
        .map((item: any) => (
          <Component {...item} key={item._id} />
        ))}
    </div>
  );
};

const Grid = ({ data, Component, children }: any) => {
  const constant = 3;

  return (
    <div className="row">
      {Array.from({ length: constant }).map((_, idx) => (
        <Col
          idx={idx}
          key={idx}
          data={data}
          Component={Component}
          constant={constant}
        />
      ))}
      {children}
    </div>
  );
};

export default Grid;
