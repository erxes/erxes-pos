import { useLazyQuery, gql } from '@apollo/client';
import { queries } from '../../products/graphql';
import { formatNum } from 'modules/utils';
import Button from 'ui/Button';
import { useState } from 'react';

const PriceInfoContainer = ({
  price,
  productId,
}: {
  price: number;
  productId: string;
}) => {
  const [showDiscount, setShowDiscount] = useState(false);

  const [getPriceInfo, { loading, data }] = useLazyQuery(
    gql(queries.getPriceInfo),
    {
      variables: {
        productId: productId,
      },
    }
  );

  const handleClick = () => {
    getPriceInfo();
  };

  const obj = (data || {}).getPriceInfo;
  const info = !!obj && JSON.parse(obj);

  const { value, price: discountPrice } = (info || {})[productId]|| info || {};
  
  const show = showDiscount && !!discountPrice;

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      loading={loading}
      onMouseEnter={() => setShowDiscount(true)}
      onMouseLeave={() => setShowDiscount(false)}
    >
      {formatNum(show ? discountPrice : price)}₮{show && ('/' + value)}{' '}
    </Button>
  );
};

export default PriceInfoContainer;
