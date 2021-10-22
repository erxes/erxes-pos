import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import React from 'react';
import { Alert } from 'modules/common/utils';
import { IRouterProps } from '../../../types';
import { withProps } from '../../utils';
import { mutations } from '../graphql/index';
import Pos from '../components/Pos';
import { OrdersAddMutationResponse } from '../types';

type Props = {
  ordersAddMutation: OrdersAddMutationResponse
} & IRouterProps;

class PosContainer extends React.Component<Props> {
  render() {
    const { ordersAddMutation } = this.props;

    const makePayment = (params: any) => {
      ordersAddMutation({ variables: params });

      return Alert.success('Order has been created');
    };

    const updatedProps = { ...this.props, makePayment };

    return (
      <Pos {...updatedProps} />
    );
  }
}

export default withProps<Props>(
  compose(
    graphql<Props, OrdersAddMutationResponse>(
      gql(mutations.ordersAdd),
      {
        name: 'ordersAddMutation'
      }
    )
  )(withRouter<Props>(PosContainer))
);
