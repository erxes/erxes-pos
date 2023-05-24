import Input from 'ui/Input';
import Image from 'ui/Image';
import React from 'react';
import { Search } from 'lucide-react';
import HeaderMenu from 'modules/common/Layout/HeaderMenu';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <main className="h-screen">
      <header className="p-4 border-b flex items-center">
        <div className="w-4/6 px-2">
          <div className="relative">
            <Input className="p-3 pl-11" placeholder="1062 - Төмс (Монгол)" />
            <Search className="absolute text-2xl top-3 left-3 text-black/50" />
          </div>
        </div>
        <div className="w-2/6 flex items-center px-2 ">
          <p className="text-black/60 flex-auto text-center">
            B. Uranchimeg (Manager)
          </p>
          <div className="p-1 bg-gray-100 rounded-md ">
            <div className="py-1 px-3 rounded bg-white">
              <Image
                alt="logo"
                src="/logo-dark.png"
                height={32}
                width={72}
                className="object-contain"
              />
            </div>
          </div>
          <HeaderMenu />
        </div>
      </header>

      {children}
    </main>
  );
};

export default Layout;
