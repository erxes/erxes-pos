import dynamic from 'next/dynamic';
import CheckMode from 'modules/CheckMode';

const Kitchen = dynamic(() => import('modules/kitchen'), {
  suspense: true,
});

const KitchenS = () => {
  return <CheckMode pos={<Kitchen />} />;
};

export default KitchenS;
