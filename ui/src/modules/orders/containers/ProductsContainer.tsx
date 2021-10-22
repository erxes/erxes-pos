import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import React from 'react';
import { withProps } from '../../utils';
import { IRouterProps } from '../../../types';
import { IOrderItemInput } from '../types';
import { queries } from '../graphql/index';
import Products from '../components/Products';
import Spinner from 'modules/common/components/Spinner';

type Props = {
  productCategoriesQuery: any;
  productsQuery: any;
  setItems: (items: IOrderItemInput[]) => void;
  items: IOrderItemInput[];
} & IRouterProps

class ProductsContainer extends React.Component<Props> {
  render() {
    const { productCategoriesQuery, productsQuery, items, setItems } = this.props;

    if (productCategoriesQuery.loading || productsQuery.loading) {
      return <Spinner />;
    }

    const updatedProps = {
      productCategories: productCategoriesQuery.productCategories || [],
      products: productsQuery.products || [],
      items,
      setItems
    };

    return (
      <Products {...updatedProps} />
    )
  }
}

export default withProps<Props>(
  compose(
    graphql<Props>(
      gql(queries.productCategories),
      {
        name: 'productCategoriesQuery',
      }
    ),
    graphql<Props, {}>(
      gql(queries.products),
      {
        name: 'productsQuery'
      }
    ),
  )(withRouter<Props>(ProductsContainer))
);
