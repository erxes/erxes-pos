import { AppConsumer, AppProvider } from "appContext";
import { IUser } from "modules/auth/types";
import React from "react";
import client from "apolloClient";
import gql from "graphql-tag";
import MainLayout from "../components/MainLayout";
import { IConfig } from "types";
import { Alert } from "modules/common/utils";

type Props = {
  currentUser?: IUser;
  currentConfig?: IConfig;
  plugins?: any;
  orientation: string;
  children: React.ReactNode;
};

const logout = () => {
  client
    .mutate({
      mutation: gql`
        mutation {
          logout
        }
      `,
    })

    .then(() => {
      window.location.href = "/";
    })
    .catch((error) => {
      Alert.error(error.message);
    });
};

const container = (props: Props) => (
  <AppProvider
    currentUser={props.currentUser}
    currentConfig={props.currentConfig}
    plugins={props.plugins}
  >
    <AppConsumer>{() => <MainLayout {...props} logout={logout} />}</AppConsumer>
  </AppProvider>
);

export default container;
