import * as compose from 'lodash.flowright';
import gql from 'graphql-tag';
import React from 'react';
import Screen from '../components/Screen';
import Spinner from 'modules/common/components/Spinner';
import withCurrentUser from 'modules/auth/containers/withCurrentUser';
import { graphql } from 'react-apollo';
import { IConfig, IRouterProps } from '../../../types';
import { IUser } from 'modules/auth/types';
import { queries } from '../../orders/graphql';
import { FullOrderQueryResponse } from '../../orders/types';
import { withProps } from '../../utils';
import { withRouter } from 'react-router-dom';

type Props = {
  orderQuery: FullOrderQueryResponse;
  currentUser: IUser;
  currentConfig: IConfig;
  qp: any;
} & IRouterProps;

class KitchenScreenContainer extends React.Component<Props> {
  render() {
    const { orderQuery } = this.props;

    if (orderQuery.loading) {
      return <Spinner />;
    }

    const orders = orderQuery.fullOrders || [];

    const updatedProps = {
      ...this.props,
      orders
    };

    return <Screen {...updatedProps} />;
  }
}

export default withProps<Props>(
  compose(
    graphql<Props, FullOrderQueryResponse>(gql(queries.fullOrders), {
      name: 'orderQuery',
      options: () => ({
        variables: { statuses: ['paid', 'new', 'doing', 'done'] },
        fetchPolicy: 'network-only'
      }),
    })
  )(withCurrentUser(withRouter<Props>(KitchenScreenContainer)))
);
