import dynamic from 'next/dynamic';
import CheckMode from 'modules/CheckMode';

const WaitingC = dynamic(() => import('modules/waiting'), {
  suspense: true,
});

const Waiting = () => {
  return <CheckMode pos={<WaitingC />} />;
};

export default Waiting;
