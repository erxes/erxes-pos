import React, { FC } from 'react';
import Menu from 'icons/Menu';

interface PosHeaderMenuProps {}

const PosHeaderMenu: FC<PosHeaderMenuProps> = ({}) => {
  return (
    <div className="gray-border ">
      <div className="menu">
        <Menu height={24} />
      </div>
    </div>
  );
};
export default PosHeaderMenu;
