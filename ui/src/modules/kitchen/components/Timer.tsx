import { useTime } from 'react-timer-hook';

const Timer = ({ paidDate }: any) => {
  const date = new Date(paidDate);

  const pHours = date.getHours();
  const pMinutes = date.getMinutes();
  const pSeconds = date.getSeconds();
  const oTime = pSeconds + pMinutes * 60 + pHours * 3600;

  const { seconds, minutes, hours } = useTime({});
  const time = seconds + minutes * 60 + (hours || 24) * 3600;
  let diffSeconds = time - oTime;

  if (diffSeconds < 0) {
    diffSeconds = diffSeconds + 24 * 60 * 60;
  }

  const diffHours = Math.floor(diffSeconds / 3600);
  diffSeconds = diffSeconds - diffHours * 3600;
  const diffMinutes = Math.floor(diffSeconds / 60);
  diffSeconds = diffSeconds - diffMinutes * 60;

  return (
    <div className="flex-v-center">
      <span>{diffHours}</span>:
      <span>{diffMinutes < 10 ? '0' + diffMinutes : diffMinutes}</span>:
      <span>{diffSeconds < 10 ? '0' + diffSeconds : diffSeconds || '00'}</span>
    </div>
  );
};

export default Timer;
