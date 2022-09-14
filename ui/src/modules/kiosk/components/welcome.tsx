import Image from 'next/future/image';
import Button from 'modules/common/ui/Button';
import Link from 'next/link';
import { useApp } from 'modules/AppContext';

const Welcome = () => {
  const { setIsTake } = useApp();
  return (
    <>
      <Image fill sizes="100vw" src="/background.png" alt="" />
      <div className="kiosk-welcome flex-center">
        <div className="text-center">
          <div className="img-wrap">
            <Image alt="" fill sizes="100vw" src="/logo-white.png" />
          </div>

          <h5>Эрхэс таны бизнесийн хурдасгуур</h5>
          <Button variant="slim" onClick={() => setIsTake('eat')} Component="a">
            Зааланд
          </Button>
          <Button
            variant="slim"
            onClick={() => setIsTake('take')}
            Component="a"
          >
            Авч явах
          </Button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
