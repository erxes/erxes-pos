import CheckMode from 'modules/CheckMode';
import dynamic from 'next/dynamic';
import Layout from 'modules/common/Layout';

const Pos = dynamic(() => import('modules/pos/history'), { suspense: true });

const History = () => {
  return <CheckMode pos={<Pos />} />;
};

History.Layout = Layout;

export default History;
