import React, { FC } from 'react';
import Menu from 'icons/Menu';
import Button from 'ui/Button';
import Swap from 'icons/Swap';

interface PosHeaderMenuProps {}

const PosHeaderMenu: FC<PosHeaderMenuProps> = ({}) => {
  return (
    <div className="gray-border pos-dropdown">
      <Button variant="naked">
        <Menu />
      </Button>
      <ul className="pos-menu">
        <li>
          <Swap />
        </li>
      </ul>
    </div>
  );
};
export default PosHeaderMenu;
