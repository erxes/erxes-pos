import React, { FC } from 'react';
import Link from 'next/link';
import Menu from 'icons/Menu';
import Swap from 'icons/Swap';
import PieChart from 'icons/PieChart';
import Setting from 'icons/Settings';
import Logout from 'modules/auth/containers/Logout';
import Clock from 'icons/Clock';
import Cover from 'icons/Cover';
import Button from 'ui/Button';
import Progress from 'icons/Progress';

interface HeaderMenuProps {}

const HeaderMenu: FC<HeaderMenuProps> = ({}) => {
  return (
    <div className="gray-border pos-dropdown">
      <Button variant="naked">
        <Menu />
      </Button>
      <ul className="pos-menu">
        <li>
          <Link href="/history" prefetch={false}>
            <Swap /> Захиалгын түүх
          </Link>
        </li>

        <li>
          <Link href="/cover" prefetch={false}>
            <Cover /> Хаалт
          </Link>
        </li>

        <li>
          <Link href="/report" prefetch={false}>
            <PieChart />
            Тайлан
          </Link>
        </li>

        <li>
          <Link href="/settings" prefetch={false}>
            <Setting />
            Тохиргоо
          </Link>
        </li>

        <li>
          <Link href="/waiting" prefetch={false}>
            <Clock />
            Хүлээлгэ
          </Link>
        </li>

        <li>
          <Link href="/kitchen" prefetch={false}>
            <Progress />
            Бэлтгэл
          </Link>
        </li>

        <Logout />
      </ul>
    </div>
  );
};
export default HeaderMenu;
