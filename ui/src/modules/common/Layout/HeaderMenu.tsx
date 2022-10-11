import React, { FC } from 'react';
import Link from 'next/link';
import Menu from 'icons/Menu';
import Swap from 'icons/Swap';
import PieChart from 'icons/PieChart';
import Setting from 'icons/Settings';
import Logout from 'modules/auth/containers/Logout';
import Clock from 'icons/Clock';
import Chef from 'icons/Chef';
import Button from 'ui/Button';

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
            <a>
              <Swap /> Захиалгын түүх
            </a>
          </Link>
        </li>

        <li>
          <Link href="/report" prefetch={false}>
            <a>
              <PieChart />
              Тайлан
            </a>
          </Link>
        </li>

        <li>
          <Link href="/settings" prefetch={false}>
            <a>
              <Setting />
              Тохиргоо
            </a>
          </Link>
        </li>

        <li>
          <Link href="/waiting" prefetch={false}>
            <a>
              <Clock />
              Хүлээлгэ
            </a>
          </Link>
        </li>

        <li>
          <Link href="/kitchen" prefetch={false}>
            <a>
              <Chef />
              Гал тогоо
            </a>
          </Link>
        </li>

        <Logout />
      </ul>
    </div>
  );
};
export default HeaderMenu;
