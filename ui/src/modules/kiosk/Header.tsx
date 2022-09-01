import Image from 'next/future/image';
import Search from 'modules/products/components/Search';

const Header = () => {
  return (
    <header>
      <Image src="/background.png" fill alt="" sizes="100vw" />
      <div className="flex-v-center">
        <div className="img-wrap">
          <Image alt="" src="/logo-white.png" fill />
        </div>
        <Search open />
      </div>
    </header>
  );
};

export default Header;
