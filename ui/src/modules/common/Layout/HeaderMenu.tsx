import React, { FC } from 'react';
import Link from 'next/link';
import Menu from 'icons/Menu';
import Swap from 'icons/Swap';
import PieChart from 'icons/PieChart';
import Setting from 'icons/Settings';
import Logout from 'modules/auth/containers/Logout';
import Clock from 'icons/Clock';
import Cover from 'icons/Cover';
import Progress from 'icons/Progress';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from 'components/ui/navigation-menu';
import { Button } from 'components/ui/button';

interface HeaderMenuProps {}

const HeaderMenu: FC<HeaderMenuProps> = ({}) => {
  return (
    <NavigationMenu className="flex-shrink-0 flex-grow-0">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger >
            <Button>
              <Menu />
            </Button>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-5">
                <Link href="/history" prefetch={false}>
                    <Swap /> Захиалгын түүх
                </Link>

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
                    <Progress />
                    Бэлтгэл
                  </a>
                </Link>
              </li>

              <Logout />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default HeaderMenu;
{
  /* <div className="gray-border pos-dropdown">
<Button variant="naked">
  <Menu />
</Button>

</div> */
}
