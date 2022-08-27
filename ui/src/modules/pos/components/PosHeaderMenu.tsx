import React, { FC } from 'react';
import Link from 'next/link';
import Menu from 'icons/Menu';
import Swap from 'icons/Swap';
import PieChart from 'icons/PieChart';
import Setting from 'icons/Settings';
import Logout from 'icons/Logout';
import Button from 'ui/Button';

interface PosHeaderMenuProps {}

const PosHeaderMenu: FC<PosHeaderMenuProps> = ({}) => {
  return (
    <div className="gray-border pos-dropdown">
      <Button variant="naked">
        <Menu />
      </Button>
      <ul className="pos-menu">
        <Link href="/history" prefetch={false}>
          <li>
            <Swap /> Захиалгын түүх
          </li>
        </Link>
        <Link href="/report" prefetch={false}>
          <li>
            <PieChart />
            Тайлан
          </li>
        </Link>
        <Link href="/settings" prefetch={false}>
          <li>
            <Setting />
            Тохиргоо
          </li>
        </Link>
        <Button>
          <Logout />
          Гарах
        </Button>
      </ul>
    </div>
  );
};
export default PosHeaderMenu;
