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
              <Setting />
              Хүлээлгэ
            </a>
          </Link>
        </li>

        <li>
          <Link href="/kitchen" prefetch={false}>
            <a>
              <Setting />
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
