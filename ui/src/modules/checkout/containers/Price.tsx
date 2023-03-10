import { useLazyQuery, gql } from '@apollo/client';
import { queries } from '../../products/graphql';
import { formatNum } from 'modules/utils';
import Button from 'ui/Button';

const PriceInfoContainer = ({
  price,
  productId,
}: {
  price: number;
  productId: string;
}) => {
  let result = '';

  const [getPriceInfo, { loading }] = useLazyQuery(gql(queries.getPriceInfo), {
    variables: {
      productId: productId,
    },
    onCompleted(data) {
      result = (data || {}).getPriceInfo || '';
    },
  });

  const handleClick = () => {
    getPriceInfo();
  };

  return (
    <Button onClick={handleClick} title={result} variant='ghost' Component={"abbr"} loading={loading} >  
      {formatNum(price)}₮ 
    </Button>
  );
};

export default PriceInfoContainer;
