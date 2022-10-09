import Image from 'ui/Image';
import Button from 'modules/common/ui/Button';
import { useApp } from 'modules/AppContext';
import { useConfigsContext } from 'modules/auth/containers/Configs';

const Welcome = ({ setIsTake }: any) => {
  const { setType } = useApp();
  const { bgImage, logoUrl } = useConfigsContext();

  const handleClick = (val: string) => {
    setType(val);
    setIsTake(true);
  };

  return (
    <>
      <Image
        fill
        sizes="100vw"
        src={bgImage || ''}
        fallBack="/background.png"
        alt=""
      />
      <div className="kiosk-welcome flex-center">
        <div className="text-center">
          <div className="img-wrap">
            <Image
              alt=""
              fill
              sizes="100vw"
              fallBack="/logo-white.png"
              src={logoUrl || ''}
            />
          </div>

          <h5>Эрхэс таны бизнесийн хурдасгуур</h5>
          <Button variant="slim" onClick={() => handleClick('eat')}>
            Зааланд
          </Button>
          <Button variant="slim" onClick={() => handleClick('take')}>
            Авч явах
          </Button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
