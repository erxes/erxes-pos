import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import queryString from 'query-string';

import { queries } from '../../graphql/index';
import SearchInput from 'modules/orders/components/SearchInput';
import OrderItem from 'modules/orders/components/drawer/OrderItem';
import { Orders } from 'modules/orders/styles';
import { withProps, router } from 'modules/common/utils';
import { OrderQueryResponse } from 'modules/orders/types';
import { IRouterProps } from 'types';
import Spinner from 'modules/common/components/Spinner';

type Props = {};

type WithProps = {
  history: any;
  queryParams: any;
};

type FinalProps = {
  ordersQuery: OrderQueryResponse;
} & Props &
  WithProps;

class SearchContainer extends React.Component<FinalProps> {
  clearSearch = () => {
    router.setParams(this.props.history, { orderSearch: '' });
  };

  onSearch = e => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const searchValue = e.currentTarget.value;

      router.setParams(this.props.history, { orderSearch: searchValue });
    }
  };

  renderContent() {
    const { ordersQuery } = this.props;

    if (ordersQuery.loading) {
      return <Spinner />;
    }

    return ordersQuery.orders.map(order => (
      <OrderItem key={order._id} order={order} />
    ));
  }

  render() {
    return (
      <>
        <SearchInput
          onSearch={this.onSearch}
          clearSearch={this.clearSearch}
          placeholder="Search"
        />
        <Orders>{this.renderContent()}</Orders>
      </>
    );
  }
}

const WithSearchContainer = withProps<WithProps>(
  compose(
    graphql<WithProps, OrderQueryResponse>(gql(queries.orders), {
      name: 'ordersQuery',
      options: ({ queryParams }: { queryParams: any }) => ({
        variables: { searchValue: queryParams.orderSearch }
      })
    })
  )(SearchContainer)
);

const WithQueryParams = (props: IRouterProps & Props) => {
  const { location } = props;
  const queryParams = queryString.parse(location.search);

  const extendedProps = { ...props, queryParams };

  return <WithSearchContainer {...extendedProps} />;
};

export default withRouter<IRouterProps & Props>(WithQueryParams);
