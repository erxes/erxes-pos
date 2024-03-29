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
import { useConfigsContext } from '../../auth/containers/Configs';

interface HeaderMenuProps {}

const HeaderMenu: FC<HeaderMenuProps> = ({}) => {
  const { showWaiting } = useConfigsContext();

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
          <Link href="/cover" prefetch={false}>
            <a>
              <Cover /> Хаалт
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

        {!!showWaiting && (
          <li>
            <Link href="/waiting" prefetch={false}>
              <a>
                <Clock />
                Хүлээлгэ
              </a>
            </Link>
          </li>
        )}

        <li>
          <Link href="/kitchen" prefetch={false}>
            <a>
              <Progress />
              Бэлтгэл
            </a>
          </Link>
        </li>

        <Logout />
      </ul>
    </div>
  );
};
export default HeaderMenu;
