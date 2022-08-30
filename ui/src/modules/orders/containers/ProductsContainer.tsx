import { withRouter } from 'react-router-dom';
import React from 'react';
import queryString from 'query-string';

import { IRouterProps, IConfig, ProductsQueryResponse } from '../../../types';
import { IOrder, IOrderItemInput } from '../types';
import Products from '../components/Products';
import Spinner from 'modules/common/components/Spinner';
import withCurrentUser from 'modules/auth/containers/withCurrentUser';

type Props = {
  productsQuery: ProductsQueryResponse;
  setItems: (items: IOrderItemInput[]) => void;
  items: IOrderItemInput[];
  currentConfig: IConfig;
  orientation: string;
  order: IOrder | null;
} & IRouterProps;

class ProductsContainer extends React.Component<Props> {
  render() {
    const { productsQuery, location } = this.props;

    if (productsQuery.loading) {
      return <Spinner />;
    }

    const updatedProps = {
      ...this.props,
      products: productsQuery.poscProducts || [],
      qp: queryString.parse(location.search)
    };

    return <Products {...updatedProps} />;
  }
}

export default withCurrentUser(
  withRouter<IRouterProps & Props>(ProductsContainer)
);
