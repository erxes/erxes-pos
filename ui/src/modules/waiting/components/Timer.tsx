/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

const Timer = ({ editOrder, expiryTimestamp }: any) => {
  const { seconds, minutes, hours, days, start } = useTimer({
    expiryTimestamp,
    onExpire: () => editOrder(),
  });

  useEffect(() => {
    start();
  }, []);

  return (
    <small>
      <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
      <span>{seconds}</span>
    </small>
  );
};

export default Timer;
