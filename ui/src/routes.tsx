import withCurrentUser from "modules/auth/containers/withCurrentUser";
import asyncComponent from "modules/common/components/AsyncComponent";
import { pluginsOfRoutes } from "pluginUtils";
import queryString from "query-string";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthRoutes from "./modules/auth/routes";
import SettingsRoutes from "./modules/settings/routes";
import KitchenRoutes from "./modules/kitchen/routes";
import WaitingRoutes from "./modules/waiting/routes";
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

const renderRoutes = (posCurrentUser, currentConfig, orientation) => {
  const userConfirmation = ({ location }) => {
    const queryParams = queryString.parse(location.search);

    const UserConfirmation = ({ queryParams, posCurrentUser }) => (
      <div>user confirmation</div>
    );

    return (
      <UserConfirmation queryParams={queryParams} posCurrentUser={posCurrentUser} />
    );
  };

  if (!sessionStorage.getItem("sessioncode")) {
    sessionStorage.setItem("sessioncode", Math.random().toString());
  }

  if (posCurrentUser) {
    const { plugins, pluginRoutes, specialPluginRoutes } = pluginsOfRoutes(
      posCurrentUser
    );

    return (
      <>
        <MainLayout
          posCurrentUser={posCurrentUser}
          orientation={orientation}
          currentConfig={currentConfig}
          plugins={plugins}
        >
          {specialPluginRoutes}
          {pluginRoutes}
          <OrderRoutes />
          <SettingsRoutes />
          <KitchenRoutes />
          <WaitingRoutes />
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
  posCurrentUser,
  currentConfig,
  orientation,
}: {
  posCurrentUser: IUser;
  currentConfig: IConfig;
  orientation: string;
}) => (
  <Router>
    <>
      <Route
        key="/unsubscribe"
        exact={true}
        path="/unsubscribe"
        component={unsubscribe}
      />

      {renderRoutes(posCurrentUser, currentConfig, orientation)}
    </>
  </Router>
);

export default withCurrentUser(Routes);
