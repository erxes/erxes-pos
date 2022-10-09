import { useConfigsContext } from 'modules/auth/containers/Configs';
import Image from 'ui/Image';

const Header = () => {
  const { bgImage, logoUrl } = useConfigsContext();

  return (
    <header>
      <Image
        fallBack="/background.png"
        src={bgImage || ''}
        fill
        alt=""
        sizes="100vw"
      />
      <div className="flex-h-between">
        <div className="img-wrap">
          <Image alt="" fallBack="/logo-white.png" src={logoUrl || ''} fill />
        </div>
      </div>
    </header>
  );
};

export default Header;
