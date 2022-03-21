import { graphql } from 'react-apollo';
import { router } from "modules/common/utils";
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import React from 'react';
import { Alert, __ } from 'modules/common/utils';
import { IRouterProps, IConfig } from '../../../types';
import { withProps } from '../../utils';
import { mutations, queries } from '../graphql/index';
import Pos from '../components/Pos';
import {
  OrdersAddMutationResponse,
  OrdersEditMutationResponse,
  IOrder
} from '../types';
import withCurrentUser from 'modules/auth/containers/withCurrentUser';
import { IUser } from 'modules/auth/types';
import client from 'erxes-ui/lib/apolloClient';

type Props = {
  ordersAddMutation: OrdersAddMutationResponse;
  ordersEditMutation: OrdersEditMutationResponse;
  posCurrentUser: IUser;
  currentConfig: IConfig;
  qp: any;
  orientation: string;
  productCategoriesQuery: any;
  productsQuery: any;
  customersAddMutation: any;
} & IRouterProps;

export interface IPaymentParams {
  cardAmount?: number;
  cashAmount?: number;
  mobileAmount?: number;
  billType: string;
  registerNumber?: string;
}

class PosContainer extends React.Component<Props, { order: IOrder | null }> {
  constructor(props) {
    super(props);

    this.state = {
      order: null
    };
  }

  qry = (_id) => {
    client
      .query({
        query: gql(queries.orderDetail),
        variables: { _id },
        fetchPolicy: 'network-only'
      })
      .then(({ data }) => {
        this.setState({
          order: data.orderDetail
        });
      });
  }

  componentDidMount() {
    const { qp } = this.props;
    this.qry(qp.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.qp.id !== this.props.qp.id) {
      this.qry(nextProps.qp.id)
    }
  }

  render() {
    const {
      ordersAddMutation,
      ordersEditMutation,
      customersAddMutation,
    } = this.props;

    const createOrder = (params: any, callback?) => {
      ordersAddMutation({ variables: params })
        .then(({ data }) => {
          if (data && data.ordersAdd && data.ordersAdd.number) {
            Alert.success(
              `Order ${data.ordersAdd.number} has been created successfully.`
            );
          }

          return data.ordersAdd;
        })
        .then(order => {
          if (order && order._id) {
            Alert.success(`Order has been created successfully.`);

            this.setState({ order });
            router.setParams(this.props.history, { id: order._id, home: null });

            if (callback) {
              callback();
            }
          }
        })
        .catch(e => {
          return Alert.error(__(e.message));
        });
    };

    const updateOrder = (params: any, callback?) => {
      return ordersEditMutation({ variables: params })
        .then(({ data }) => {
          if (data && data.ordersEdit && data.ordersEdit._id) {
            Alert.success(`Order has been updated successfully.`);

            if (callback) {
              callback();
            }

            return data.ordersEdit;
          }
        })
        .catch(e => {
          return Alert.error(__(e.message));
        });
    };

    const addCustomer = (params: any) => {
      customersAddMutation({ variables: params })
        .then(({ data }) => {
          if (data && data.customersAdd && data.customersAdd._id) {
            Alert.success('Customer successfully created.');
          }
        })
        .catch(e => {
          Alert.error(__(e.message));
        });
    };

    const updatedProps = {
      ...this.props,
      createOrder,
      updateOrder,
      addCustomer,
      order: this.state.order,
    };

    return <Pos {...updatedProps} />;
  }
}

const getRefetchQueries = _id => {
  return [
    {
      query: gql(queries.orderDetail),
      variables: { _id },
      fetchPolicy: "network-only",
    }
  ];
};

export default withProps<Props>(
  compose(
    graphql<Props, OrdersAddMutationResponse>(gql(mutations.ordersAdd), {
      name: 'ordersAddMutation'
    }),
    graphql<Props, OrdersEditMutationResponse>(gql(mutations.ordersEdit), {
      name: 'ordersEditMutation',
      options: ({ qp }) => ({
        refetchQueries: getRefetchQueries(qp.id)
      })
    }),
    graphql<Props>(gql(mutations.ordersMakePayment), {
      name: 'makePaymentMutation'
    }),
    graphql<Props>(gql(queries.productCategories), {
      name: 'productCategoriesQuery'
    }),
    graphql<Props>(gql(queries.products), {
      name: 'productsQuery',
      options: ({ qp }) => ({
        variables: {
          searchValue: qp && qp.searchValue ? qp.searchValue : '',
          categoryId: qp && qp.categoryId ? qp.categoryId : ''
        }
      })
    }),
    graphql<Props>(gql(mutations.customersAdd), {
      name: 'customersAddMutation'
    }),
  )(withCurrentUser(withRouter<Props>(PosContainer)))
);
