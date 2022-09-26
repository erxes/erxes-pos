import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import CheckMode, { checkLayoutMode } from 'modules/CheckMode';

const dynamicProps = {
  suspense: true,
};

const Pos = dynamic(() => import('modules/pos'), { ...dynamicProps });

const Kiosk = dynamic(() => import('modules/kiosk'), { ...dynamicProps });

const Home: NextPage = () => {
  return <CheckMode pos={<Pos />} kiosk={<Kiosk />} />;
};

// (Home as any).Layout = checkLayoutMode(PosLayout, MainLayout);

export default Home;
