import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import CheckMode from 'modules/CheckMode';

const Pos = dynamic(() => import('modules/pos'), { suspense: true });

const Kiosk = dynamic(() => import('modules/kiosk'), { suspense: true });

const Waiting = dynamic(() => import('modules/waiting'), { suspense: true });

const Kitchen = dynamic(() => import('modules/kitchen'), { suspense: true });

const Home: NextPage = () => {
  return (
    <CheckMode
      pos={<Pos />}
      kiosk={<Kiosk />}
      waiting={<Waiting />}
      kitchen={<Kitchen />}
    />
  );
};

export default Home;
