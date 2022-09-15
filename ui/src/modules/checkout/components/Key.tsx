import { useUI } from 'modules/common/ui/context';
import { getMode } from 'modules/utils';
import Button from 'modules/common/ui/Button';
import { IComponent } from 'modules/types';

import DeleteLeft from 'icons/DeleteLeft';

const Key = ({ value, touch }: { value: number | string; touch?: boolean }) => {
  const { changeKey } = useUI();

  const handleClick = () => {
    if (getMode() === 'kiosk') {
      changeKey(value);
    }

    // if (value === 'C') {
    //   return setCardValue(card.toString().slice(0, -1));
    // }
    // return setCardValue(card + '' + value);
  };

  const HeadingTag: IComponent = ({ children }) =>
    touch ? <h2>{children}</h2> : <h6>{children}</h6>;

  return (
    <div className="col-3 key">
      <Button variant="slim" onClick={handleClick}>
        <HeadingTag>
          {touch && value === 'C' ? <DeleteLeft /> : value}
        </HeadingTag>
      </Button>
    </div>
  );
};

export default Key;
