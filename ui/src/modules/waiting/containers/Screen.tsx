import * as compose from 'lodash.flowright';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import Screen from '../components/Screen';
import Spinner from 'modules/common/components/Spinner';
import withCurrentUser from 'modules/auth/containers/withCurrentUser';
import { FullOrderQueryResponse, OrderChangeStatusMutationResponse } from '../../orders/types';
import { graphql } from 'react-apollo';
import { IConfig, IRouterProps } from '../../../types';
import { IUser } from 'modules/auth/types';
import { mutations, queries, subscriptions } from '../../orders/graphql';
import { withProps } from '../../utils';
import { withRouter } from 'react-router-dom';

type Props = {
  orderQuery: FullOrderQueryResponse;
  posCurrentUser: IUser;
  currentConfig: IConfig;
  orderChangeStatusMutation: OrderChangeStatusMutationResponse;
} & IRouterProps;

function WaitingScreenContainer(props: Props) {
  const { orderQuery, orderChangeStatusMutation } = props;

  useEffect(() => {
    return orderQuery.subscribeToMore({
      document: gql(subscriptions.ordersOrdered),
      variables: { statuses: ["doing", "done", "complete"] },
      updateQuery: () => {
        orderQuery.refetch();
      },
    });
  });

  useEffect(() => {
    return orderQuery.subscribeToMore({
      document: gql(subscriptions.orderItemsOrdered),
      variables: { statuses: ['done', 'confirm'] },
      updateQuery: () => {
        orderQuery.refetch();
      },
    });
  });

  if (orderQuery.loading) {
    return <Spinner />;
  }

  const editOrder = (doc) => {
    orderChangeStatusMutation({ variables: { ...doc } })
  };

  const orders = orderQuery.fullOrders || [];
  const updatedProps = {
    ...props,
    orders,
    editOrder,
  };

  return <Screen {...updatedProps} />;
}

export default withProps<Props>(
  compose(
    graphql<Props, FullOrderQueryResponse>(gql(queries.fullOrders), {
      name: "orderQuery",
      options: () => ({
        variables: { statuses: ['done', 'confirm', 'doing'] },
        fetchPolicy: "network-only",
      }),
    }),
    graphql<Props, OrderChangeStatusMutationResponse>(gql(mutations.orderChangeStatus), {
      name: "orderChangeStatusMutation",
    }),
  )(withCurrentUser(withRouter<Props>(WaitingScreenContainer)))
);
