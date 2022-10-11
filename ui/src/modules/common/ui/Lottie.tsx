/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from 'react';
import type { LottiePlayer } from 'lottie-web';

interface IProps {
  animationData?: any;
  autoplay?: boolean;
  loop?: boolean;
  path?: string;
}

const LottieView = ({
  animationData,
  autoplay = true,
  loop = true,
  path,
}: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);

  useEffect(() => {
    import('lottie-web').then((Lottie) => setLottie(Lottie.default));
  }, []);
  useEffect(() => {
    if (lottie && ref.current) {
      const animation = lottie.loadAnimation({
        container: ref.current,
        renderer: 'svg',
        loop,
        autoplay,
        animationData,
        path,
      });

      return () => animation.destroy();
    }
  }, [lottie]);

  return <div ref={ref}></div>;
};

export default LottieView;
