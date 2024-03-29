import dynamic from 'next/dynamic';
import CheckMode from 'modules/CheckMode';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import Empty from 'modules/common/ui/Empty';

const WaitingC = dynamic(() => import('modules/waiting'), {
  suspense: true,
});

const PosLayout = dynamic(() => import('modules/pos/components/PosLayout'), {
  suspense: true,
});

const Waiting = () => {
  const { showWaiting } = useConfigsContext();
  return (
    <CheckMode
      pos={
        showWaiting ? (
          <WaitingC />
        ) : (
          <PosLayout>
            <br />
            <br />
            <br />
            <br />
            <Empty />
          </PosLayout>
        )
      }
    />
  );
};

export default Waiting;
