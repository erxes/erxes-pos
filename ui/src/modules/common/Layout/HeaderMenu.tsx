import React, { FC } from 'react';
import Link from 'next/link';
import Menu from 'modules/common/icons/Menu';
import Swap from 'modules/common/icons/Swap';
import PieChart from 'modules/common/icons/PieChart';
import Setting from 'modules/common/icons/Settings';
import Logout from 'modules/auth/containers/Logout';
import Button from 'modules/common/ui/Button';

interface HeaderMenuProps {}

const HeaderMenu: FC<HeaderMenuProps> = ({}) => {
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
        <Logout />
      </ul>
    </div>
  );
};
export default HeaderMenu;
