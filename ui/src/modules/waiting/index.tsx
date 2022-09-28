import Image from 'ui/Image';
import WaitingContainer from './containers';

const Waiting = () => {
  return (
    <div className="waiting h-100vh">
      <header className="flex-v-center">
        <div className="img-wrap flex-0">
          <Image alt="" src={''} />
        </div>
        <h4 className="text-center flex-1">
          Дугаар бүхий хэрэглэгчид хоолоо авна уу.
        </h4>
      </header>
      <WaitingContainer />
    </div>
  );
};

export default Waiting;
