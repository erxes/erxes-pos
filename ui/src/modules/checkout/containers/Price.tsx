import { useLazyQuery, gql } from '@apollo/client';
import { queries } from '../../products/graphql';
import Price from '../components/Price';

const PriceInfoContainer = (props: { price: number, productId: string }) => {
  let result = '';

  const [getPriceInfo, { loading }] = useLazyQuery(gql(queries.getPriceInfo), {
    variables: {
      productId: props.productId
    },
    onCompleted(data) {
      result = (data || {}).getPriceInfo || '';
    },
  });


  const handleClick = () => {
    getPriceInfo();
  };

  return (
    <Price
      onClick={handleClick}
      result={result}
      price={props.price}
    />
  );
};

export default PriceInfoContainer;
