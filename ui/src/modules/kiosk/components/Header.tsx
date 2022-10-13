/* eslint-disable @next/next/no-html-link-for-pages */
import { useConfigsContext } from 'modules/auth/containers/Configs';
import Image from 'ui/Image';

const Header = () => {
  const { logoUrl, kioskHeaderImage } = useConfigsContext();

  return (
    <header>
      <Image
        fallBack="/background.png"
        src={kioskHeaderImage || ''}
        fill
        alt=""
        sizes="100vw"
        noWrap
        priority
      />
      <div className="flex-h-between">
        <div>
          <Image
            alt=""
            fallBack="/logo-white.png"
            src={logoUrl || ''}
            fill
            priority
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
