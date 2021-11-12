import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import React from 'react';
import withCurrentUser from "modules/auth/containers/withCurrentUser";
import Spinner from "modules/common/components/Spinner";
import { IRouterProps } from '../../../types';
import { withProps } from '../../utils';
import { queries } from '../graphql/index';
import Receipt from '../components/receipt/Receipt';
import { OrderDetailQueryResponse } from '../types';

type Props = {
  id: string;
};

type FinalProps = {
  orderDetailQuery: OrderDetailQueryResponse;
} & Props & IRouterProps;

class ReceiptContainer extends React.Component<FinalProps> {
  render() {
    const { orderDetailQuery } = this.props;

    if (orderDetailQuery.loading) {
      return <Spinner />;
    }

    return <Receipt order={orderDetailQuery.orderDetail} />;
  }
};

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
  )(withCurrentUser(withRouter<FinalProps>(ReceiptContainer)))
);
