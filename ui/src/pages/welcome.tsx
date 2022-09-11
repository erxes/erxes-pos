import Image from 'next/future/image';
import Button from 'modules/common/ui/Button';
import Link from 'next/link';

const welcome = () => {
  return (
    <>
      <Image fill sizes="100vw" src="/background.png" alt="" />
      <div className="kiosk-welcome flex-center">
        <div className="text-center">
          <div className="img-wrap">
            <Image alt="" fill sizes="100vw" src="/logo-white.png" />
          </div>

          <h5>Эрхэс таны бизнесийн хурдасгуур</h5>
          <Link href="/kiosk">
            <Button variant="slim" Component="a">
              Зааланд
            </Button>
          </Link>
          <Link href="/kiosk">
            <Button variant="slim" Component="a">
              Авч явах
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default welcome;
