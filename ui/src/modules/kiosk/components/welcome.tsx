import Image from 'ui/Image';
import Button from 'modules/common/ui/Button';
import { useApp } from 'modules/AppContext';
import { useConfigsContext } from 'modules/auth/containers/Configs';

const Welcome = () => {
  const { setType, changeIsChanged } = useApp();
  const { bgImage, logoUrl } = useConfigsContext();

  const handleClick = (val: string) => {
    setType(val);
    changeIsChanged(true);
  };

  return (
    <>
      <div className="kiosk-welcome flex-center">
        <Image
          fill
          sizes="100vw"
          src={bgImage || ''}
          fallBack="/background.png"
          alt=""
          noWrap
        />
        <div className="text-center">
          <Image
            alt=""
            fill
            sizes="100vw"
            fallBack="/logo-white.png"
            src={logoUrl || ''}
          />

          <h5>
            Ta төлбөрөө төлсөн бол заавал <br /> баримтаа авна уу
          </h5>
          <Button onClick={() => handleClick('eat')}>Зааланд</Button>
          <Button onClick={() => handleClick('take')}>Авч явах</Button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
