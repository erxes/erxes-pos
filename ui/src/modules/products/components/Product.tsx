import Image from 'ui/Image';
import Ink from 'react-ink';
import { formatNum } from 'modules/utils';
import { getMode } from 'modules/utils';
import cn from 'classnames';
import { readFile } from 'modules/utils';

export default function Product({
  attachment,
  name,
  unitPrice,
  remainder,
  riffle = true,
  onClick,
}: any) {
  const isKiosk = getMode() === 'kiosk';
  return (
    <div
      className={cn('product', { 'kiosk-product': isKiosk })}
      onClick={onClick && onClick}
    >
      <abbr title={name}>
        <Image src={readFile((attachment || {}).url)} alt="" withLoader />
        <div className="product-name">{name}</div>
        <div className="product-price">
          {formatNum(unitPrice)}₮{' '}
          {!isKiosk && !!remainder && '/' + remainder + '/'}
        </div>

        {riffle && <Ink background={false} duration={800} />}
      </abbr>
    </div>
  );
}
