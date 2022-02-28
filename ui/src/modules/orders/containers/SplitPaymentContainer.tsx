import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import React from 'react';

import withCurrentUser from 'modules/auth/containers/withCurrentUser';
import Spinner from 'modules/common/components/Spinner';
import { IRouterProps } from '../../../types';
import { withProps, trimGraphqlError } from '../../utils';
import { Alert, __ } from 'modules/common/utils';
import { queries, mutations } from '../graphql/index';
import SplitPayment from '../components/splitPayment/SplitPayment';
import {
  ICardPayment,
  OrderDetailQueryResponse,
  IInvoiceParams,
  IInvoiceCheckParams,
  IPaymentParams
} from '../types';

type Props = {
  id: string;
};

type FinalProps = {
  orderDetailQuery: OrderDetailQueryResponse;
  addCardPaymentMutation: any;
  createInvoiceMutation: any;
  checkInvoiceMutation: any;
  cancelInvoiceMutation: any;
  makePaymentMutation: any;
} & Props &
  IRouterProps;

class SplitPaymentContainer extends React.Component<FinalProps> {
  render() {
    const {
      orderDetailQuery,
      addCardPaymentMutation,
      createInvoiceMutation,
      checkInvoiceMutation,
      cancelInvoiceMutation,
      makePaymentMutation
    } = this.props;

    if (orderDetailQuery.loading) {
      return <Spinner />;
    }

    if (orderDetailQuery.error) {
      return <div>{orderDetailQuery.error.message}</div>;
    }

    const addCardPayment = (params: ICardPayment) => {
      addCardPaymentMutation({ variables: params })
        .then(() => {
          orderDetailQuery.refetch();
        })
        .catch(e => {
          Alert.error(__(trimGraphqlError(e.message)));
        });
    };

    const createQPayInvoice = (params: IInvoiceParams) => {
      createInvoiceMutation({ variables: params })
        .then(({ data }) => {
          orderDetailQuery.refetch();
        })
        .catch(e => {
          Alert.error(__(trimGraphqlError(e.message)));
        });
    };

    const checkQPayInvoice = (params: IInvoiceCheckParams) => {
      checkInvoiceMutation({ variables: params })
        .then(() => {
          orderDetailQuery.refetch();
        })
        .catch(e => {
          Alert.error(__(trimGraphqlError(e.message)));
        });
    };

    const cancelInvoice = (_id: string) => {
      cancelInvoiceMutation({ variables: { _id } })
        .then(() => {
          orderDetailQuery.refetch();

          Alert.success(__('Success'));
        })
        .catch(e => {
          Alert.error(__(trimGraphqlError(e.message)));
        });
    };

    const makePayment = (_id: string, params: IPaymentParams) => {
      makePaymentMutation({ variables: { doc: params, _id } })
        .then(({ data }) => {
          if (data.ordersMakePayment) {
            const resp = data.ordersMakePayment;

            if (resp.success === 'true') {
              return Alert.success(__('Payment successful'));
            }
            if (resp.message) {
              return Alert.warning(resp.message);
            }
            if (resp.lotteryWarningMsg) {
              return Alert.warning(resp.lotteryWarningMsg);
            }
            if (resp.getInformation) {
              return Alert.warning(resp.getInformation);
            }
          }
        })
        .then(() => {
          window.open(`/order-receipt/${_id}`, '_blank');
          window.location.href = '/pos';
        })
        .catch(e => {
          Alert.error(__(trimGraphqlError(e.message)));
        });
    };

    return (
      <SplitPayment
        order={orderDetailQuery.orderDetail}
        addCardPayment={addCardPayment}
        createQPayInvoice={createQPayInvoice}
        checkQPayInvoice={checkQPayInvoice}
        cancelQPayInvoice={cancelInvoice}
        makePayment={makePayment}
      />
    );
  }
}

export default withProps<Props>(
  compose(
    graphql<Props, OrderDetailQueryResponse>(gql(queries.orderDetail), {
      name: 'orderDetailQuery',
      options: ({ id }) => ({
        variables: { _id: id }
      })
    }),
    graphql<Props>(gql(mutations.ordersAddCardPayment), {
      name: 'addCardPaymentMutation'
    }),
    graphql<Props>(gql(mutations.createQpaySimpleInvoice), {
      name: 'createInvoiceMutation'
    }),
    graphql<Props>(gql(mutations.qpayCheckPayment), {
      name: 'checkInvoiceMutation'
    }),
    graphql<Props>(gql(mutations.qpayCancelInvoice), {
      name: 'cancelInvoiceMutation'
    }),
    graphql<Props>(gql(mutations.ordersMakePayment), {
      name: 'makePaymentMutation'
    })
  )(withCurrentUser(withRouter<FinalProps>(SplitPaymentContainer)))
);
