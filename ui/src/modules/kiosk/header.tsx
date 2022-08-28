import Image from 'next/future/image';
import Search from 'modules/products/components/Search';

const Header = () => {
  return (
    <header>
      <Image src="/background.png" fill alt="" sizes="100vw" />
      <div className="flex-v-center">
        <Image alt="" src="/logo-white.png" height={100} width={200} />
        <Search open />
      </div>
    </header>
  );
};

export default Header;
