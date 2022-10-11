import type { FC } from 'react';
import type { IProps } from 'modules/types';

const Element: FC<IProps & { itemId: number }> = ({ children }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      //   className="card"
    >
      {children}
    </div>
  );
};

export default Element;
