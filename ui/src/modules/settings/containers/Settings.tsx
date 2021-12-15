import * as compose from 'lodash.flowright';
import gql from 'graphql-tag';
import React from 'react';
import Settings from '../components/Settings';
import withCurrentUser from 'modules/auth/containers/withCurrentUser';
import { Alert } from 'modules/common/utils';
import { graphql } from 'react-apollo';
import { IConfig, IRouterProps } from '../../../types';
import { IUser } from 'modules/auth/types';
import { mutations } from '../graphql';
import { SyncConfigMutationResponse, SyncOrdersMutationResponse } from '../types';
import { withProps } from '../../utils';
import { withRouter } from 'react-router-dom';

type Props = {
  syncConfigMutation: SyncConfigMutationResponse;
  syncOrdersMutation: SyncOrdersMutationResponse;
  currentUser: IUser;
  currentConfig: IConfig;
  qp: any;
} & IRouterProps;

class SettingsContainer extends React.Component<Props> {
  render() {
    console.log('xxxxxxxxxxxxxxxxxxxxxxxx')
    const { syncConfigMutation, syncOrdersMutation } = this.props;

    const syncConfig = (type: string) => {
      syncConfigMutation({ variables: { type } }).then(({ data }) => {
        if (data) {
          Alert.success(`Order ${data.ordersAdd.number} has been created successfully.`);
        }

        return data;
      }).catch(e => {
        return Alert.error(e.message);
      });
    };

    const syncOrders = () => {
      syncOrdersMutation().then(({ data }) => {
        if (data) {
          return Alert.success(`Order has been updated successfully.`);
        }
      }).catch(e => {
        return Alert.error(e.message);
      });
    };

    const updatedProps = {
      ...this.props,
      syncConfig,
      syncOrders
    };

    return <Settings {...updatedProps} />;
  }
}

export default withProps<Props>(
  compose(
    graphql<Props, SyncConfigMutationResponse>(gql(mutations.syncConfig), {
      name: "syncConfigMutation",
    }),
    graphql<Props, SyncOrdersMutationResponse>(gql(mutations.syncOrders), {
      name: 'syncOrdersMutation'
    }),
  )(withCurrentUser(withRouter<Props>(SettingsContainer)))
);
