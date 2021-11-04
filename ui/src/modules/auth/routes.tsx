import asyncComponent from "modules/common/components/AsyncComponent";
import React from "react";
import { Route, Switch } from "react-router-dom";

const AuthLayout = asyncComponent(
  () =>
    import(
      /* webpackChunkName: "AuthLayout" */ "../layout/components/AuthLayout"
    )
);

const ForgotPassword = asyncComponent(
  () =>
    import(
      /* webpackChunkName: "ForgotPassword" */ "./containers/ForgotPassword"
    )
);

const SignIn = asyncComponent(
  () => import(/* webpackChunkName: "SignIn" */ "./containers/SignIn")
);

const signIn = () => <AuthLayout content={<SignIn />} />;

const forgotPassword = () => <AuthLayout content={<ForgotPassword />} />;

const routes = () => {
  return (
    <Switch>
      <Route path="/forgot-password" exact={true} component={forgotPassword} />
      <Route path="*" component={signIn} />
    </Switch>
  );
};

export default routes;
