import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import React from 'react';
import withCurrentUser from "modules/auth/containers/withCurrentUser";
import Spinner from "modules/common/components/Spinner";
import { IRouterProps } from '../../../types';
import { withProps } from '../../utils';
import { Alert, __ } from "modules/common/utils";
import { queries, mutations } from '../graphql/index';
import SplitPayment from '../components/splitPayment/SplitPayment';
import { ICardPayment, OrderDetailQueryResponse } from '../types';

type Props = {
  id: string;
};

type FinalProps = {
  orderDetailQuery: OrderDetailQueryResponse;
  addCardPaymentMutation: any;
} & Props & IRouterProps;

class SplitPaymentContainer extends React.Component<FinalProps> {
  render() {
    const { orderDetailQuery, addCardPaymentMutation } = this.props;

    if (orderDetailQuery.loading) {
      return <Spinner />;
    }

    const addCardPayment = (params: ICardPayment) => {
      addCardPaymentMutation({ variables: params }).then(({ data }) => {
        console.log(data, 'daadada');
      }).catch(e => {
        Alert.error(__(e.message));
      })
    };

    return (
      <SplitPayment
        order={orderDetailQuery.orderDetail}
        addCardPayment={addCardPayment}
      />
    );
  }
}

export default withProps<Props>(
  compose(
    graphql<Props, OrderDetailQueryResponse>(
      gql(queries.orderDetail),
      {
        name: 'orderDetailQuery',
        options: ({ id }) => ({
          variables: { _id: id }
        })
      }
    ),
    graphql<Props>(gql(mutations.ordersAddCardPayment), {
      name: 'addCardPaymentMutation',
    })
  )(withCurrentUser(withRouter<FinalProps>(SplitPaymentContainer)))
);