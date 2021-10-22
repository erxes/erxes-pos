import withCurrentUser from 'modules/auth/containers/withCurrentUser';
import asyncComponent from 'modules/common/components/AsyncComponent';
import { pluginsOfRoutes } from 'pluginUtils';
import queryString from 'query-string';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthRoutes from './modules/auth/routes';
import { IUser } from './modules/auth/types';

const MainLayout = asyncComponent(() =>
  import(
    /* webpackChunkName: "MainLayout" */ 'modules/layout/containers/MainLayout'
  )
);

const Unsubscribe = asyncComponent(() =>
  import(
    /* webpackChunkName: "Unsubscribe" */ 'modules/auth/containers/Unsubscribe'
  )
);

const Pos = asyncComponent(() =>
  import(
    /* webpackChunkName: "Pos" */ 'modules/orders/containers/PosContainer'
  )
);

export const unsubscribe = ({ location }) => {
  const queryParams = queryString.parse(location.search);

  return <Unsubscribe queryParams={queryParams} />;
};

const renderRoutes = currentUser => {
  const userConfirmation = ({ location }) => {
    const queryParams = queryString.parse(location.search);

    const UserConfirmation = ({ queryParams, currentUser }) => <div>user confirmation</div>

    return (
      <UserConfirmation queryParams={queryParams} currentUser={currentUser} />
    );
  };

  if (!sessionStorage.getItem('sessioncode')) {
    sessionStorage.setItem('sessioncode', Math.random().toString());
  }

  if (currentUser) {
    const { plugins, pluginRoutes, specialPluginRoutes } = pluginsOfRoutes(
      currentUser
    );

    return (
      <>
        <MainLayout currentUser={currentUser} plugins={plugins}>
          {specialPluginRoutes}
          {pluginRoutes}

          <Route
            key="/pos"
            exact={true}
            path="/"
            component={Pos}
          />

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

const Routes = ({ currentUser }: { currentUser: IUser }) => (
  <Router>
    <>
      <Route
        key="/unsubscribe"
        exact={true}
        path="/unsubscribe"
        component={unsubscribe}
      />

      {renderRoutes(currentUser)}
    </>
  </Router>
);

export default withCurrentUser(Routes);
