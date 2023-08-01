import { useTime, useTimer } from 'react-timer-hook';
import dayjs from 'dayjs';
import cn from 'classnames';
import Clock from 'modules/common/icons/Clock';

const Timer = ({ modifiedAt, paidDate, dueDate }: any) => {
  const date = new Date(dueDate || paidDate || modifiedAt);

  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: date,
  });

  const { seconds: sec, minutes: min, hours: h } = useTime({});

  const currentDate = dayjs();

  const pHours = date.getHours();
  const pMinutes = date.getMinutes();
  const pSeconds = date.getSeconds();
  const oTime = pSeconds + pMinutes * 60 + pHours * 3600;
  const time = sec + min * 60 + (h || 24) * 3600;
  let diffSeconds = time - oTime;

  if (diffSeconds < 0) {
    diffSeconds = diffSeconds + 24 * 60 * 60;
  }

  const diffHours = Math.floor(diffSeconds / 3600);
  diffSeconds = diffSeconds - diffHours * 3600;
  const diffMinutes = Math.floor(diffSeconds / 60);
  diffSeconds = diffSeconds - diffMinutes * 60;
  const _ = (date: number) => date.toString().padStart(2, '0');

  if (!!dueDate && dayjs(dueDate).isAfter(currentDate)) {
    return (
      <small className="flex-center -timer">
        <Clock />
        <span>{_(days * 24 + hours)}</span>:<span>{_(minutes)}</span>:
        <span>{_(seconds)}</span>
      </small>
    );
  }

  return (
    <small className={cn('flex-center -timer', dueDate && '-expired')}>
      {!!dueDate && <Clock />}
      <span>{diffHours}</span>:
      <span>{diffMinutes < 10 ? '0' + diffMinutes : diffMinutes}</span>:
      <span>{diffSeconds < 10 ? '0' + diffSeconds : diffSeconds || '00'}</span>
    </small>
  );
};

export default Timer;
