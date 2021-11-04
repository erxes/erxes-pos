import withCurrentUser from "modules/auth/containers/withCurrentUser";
import asyncComponent from "modules/common/components/AsyncComponent";
import { pluginsOfRoutes } from "pluginUtils";
import queryString from "query-string";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthRoutes from "./modules/auth/routes";
import OrderRoutes from "./modules/orders/routes";
import { IUser } from "./modules/auth/types";
import { IConfig } from "types";

const MainLayout = asyncComponent(
  () =>
    import(
      /* webpackChunkName: "MainLayout" */ "modules/layout/containers/MainLayout"
    )
);

const Unsubscribe = asyncComponent(
  () =>
    import(
      /* webpackChunkName: "Unsubscribe" */ "modules/auth/containers/Unsubscribe"
    )
);

export const unsubscribe = ({ location }) => {
  const queryParams = queryString.parse(location.search);

  return <Unsubscribe queryParams={queryParams} />;
};

const renderRoutes = (currentUser, currentConfig) => {
  const userConfirmation = ({ location }) => {
    const queryParams = queryString.parse(location.search);

    const UserConfirmation = ({ queryParams, currentUser }) => (
      <div>user confirmation</div>
    );

    return (
      <UserConfirmation queryParams={queryParams} currentUser={currentUser} />
    );
  };

  if (!sessionStorage.getItem("sessioncode")) {
    sessionStorage.setItem("sessioncode", Math.random().toString());
  }

  if (currentUser) {
    const { plugins, pluginRoutes, specialPluginRoutes } = pluginsOfRoutes(
      currentUser
    );

    return (
      <>
        <MainLayout
          currentUser={currentUser}
          currentConfig={currentConfig}
          plugins={plugins}
        >
          {specialPluginRoutes}
          {pluginRoutes}
          <OrderRoutes />

          <Route
            key="/confirmation"
            exact={true}
            path="/confirmation"
            component={userConfirmation}
          />
        </MainLayout>
      </>
    );
  }

  return (
    <Switch>
      <Route
        key="/confirmation"
        exact={true}
        path="/confirmation"
        component={userConfirmation}
      />
      <AuthRoutes />
    </Switch>
  );
};

const Routes = ({
  currentUser,
  currentConfig,
}: {
  currentUser: IUser;
  currentConfig: IConfig;
}) => (
  <Router>
    <>
      <Route
        key="/unsubscribe"
        exact={true}
        path="/unsubscribe"
        component={unsubscribe}
      />

      {renderRoutes(currentUser, currentConfig)}
    </>
  </Router>
);

export default withCurrentUser(Routes);
