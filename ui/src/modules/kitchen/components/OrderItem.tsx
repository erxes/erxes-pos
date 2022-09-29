import ForkKnife from 'icons/ForkKnife';
import Motocycle from 'icons/Motocycle';
import Radio from 'ui/Radio';
import Ink from 'react-ink';

const OrderItem = ({ data }: any) => {
  const { count, isTake, productName } = data;

  return (
    <div className="flex-h-between -item">
      <b className="col flex-v-center -name">
        <Radio mode="checked" />
        {isTake ? <Motocycle /> : <ForkKnife />}
        <span className="-name">{productName}</span>
      </b>
      <big className="col">x{count}</big>
      <Ink />
    </div>
  );
};

export default OrderItem;
