import { useEffect } from 'react';
import { useTime } from 'react-timer-hook';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import { ORDER_STATUSES } from 'modules/constants';

const Timer = ({ modifiedAt, editOrder, status }: any) => {
  const { currentConfig } = useConfigsContext();
  const { waitingScreen } = currentConfig || {};
  const { seconds, minutes, hours } = useTime({});

  const time = seconds + minutes * 60 + (hours || 24) * 3600;

  const waitingSec = parseInt((waitingScreen || {}).value || {}) * 60;
  let date = new Date();
  if (modifiedAt) {
    date = new Date(modifiedAt);
  }
  const mHours = date.getHours();
  const mMinutes = date.getMinutes();
  const mSeconds = date.getSeconds();

  const startTime = mSeconds + mMinutes * 60 + mHours * 3600;

  let diffSeconds = time - startTime;

  useEffect(() => {
    if (diffSeconds > waitingSec && status === ORDER_STATUSES.DONE) {
      editOrder();
    }
  }, [diffSeconds]);

  return <small>{diffSeconds}</small>;
};

export default Timer;
