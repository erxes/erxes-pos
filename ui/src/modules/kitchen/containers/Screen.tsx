import * as compose from 'lodash.flowright';
import gql from 'graphql-tag';
import React from 'react';
import Screen from '../components/Screen';
import Spinner from 'modules/common/components/Spinner';
import withCurrentUser from 'modules/auth/containers/withCurrentUser';
import { Alert } from 'modules/common/utils';
import { graphql } from 'react-apollo';
import { IConfig, IRouterProps } from '../../../types';
import { IUser } from 'modules/auth/types';
import { mutations, queries } from '../../orders/graphql';
import { FullOrderQueryResponse, OrdersEditMutationResponse } from '../../orders/types';
import { withProps } from '../../utils';
import { withRouter } from 'react-router-dom';

type Props = {
  orderQuery: FullOrderQueryResponse;
  orderEditMutation: OrdersEditMutationResponse;
  currentUser: IUser;
  currentConfig: IConfig;
  qp: any;
} & IRouterProps;

class KitchenScreenContainer extends React.Component<Props> {
  render() {
    const { orderQuery, orderEditMutation } = this.props;

    if (orderQuery.loading) {
      return <Spinner />;
    }

    const editOrder = (doc) => {
      orderEditMutation({ variables: { ...doc } }).then(({ data }) => {
        Alert.success(`${doc.number} has been synced successfully.`);
      }).catch(e => {
        return Alert.error(e.message);
      });
    };

    const orders = orderQuery.fullOrders || [];

    const updatedProps = {
      ...this.props,
      orders,
      editOrder
    };

    return <Screen {...updatedProps} />;
  }
}

export default withProps<Props>(
  compose(
    graphql<Props, FullOrderQueryResponse>(gql(queries.fullOrders), {
      name: 'orderQuery',
      options: () => ({
        variables: { statuses: ['paid', 'new', 'doing'] },
        fetchPolicy: 'network-only'
      }),
    }),
    graphql<Props, OrdersEditMutationResponse>(gql(mutations.ordersEdit), {
      name: "orderEditMutation",
    }),
  )(withCurrentUser(withRouter<Props>(KitchenScreenContainer)))
);
