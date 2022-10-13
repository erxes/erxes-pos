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
