import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import CheckMode from 'modules/CheckMode';

const dynamicProps = {
  suspense: true,
};

const Pos = dynamic(() => import('modules/pos'), { ...dynamicProps });

const Kiosk = dynamic(() => import('modules/kiosk'), { ...dynamicProps });

const Waiting = dynamic(() => import('modules/waiting'), { ...dynamicProps });

const Home: NextPage = () => {
  return <CheckMode pos={<Pos />} kiosk={<Kiosk />} waiting={<Waiting />} />;
};

export default Home;
