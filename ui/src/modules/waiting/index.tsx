import Link from 'next/link';
import Image from 'ui/Image';
import WaitingContainer from './containers';
import { useConfigsContext } from 'modules/auth/containers/Configs';

const Waiting = () => {
  const { logoUrl } = useConfigsContext();
  return (
    <div className="waiting h-100vh">
      <header className="flex-v-center">
        <Link href="/"className="img-wrap flex-0">
            <Image alt="" src={logoUrl || ''} />
        </Link>
        <h4 className="text-center flex-1">
          Дугаар бүхий хэрэглэгчид хоолоо авна уу.
        </h4>
      </header>
      <WaitingContainer />
    </div>
  );
};

export default Waiting;
