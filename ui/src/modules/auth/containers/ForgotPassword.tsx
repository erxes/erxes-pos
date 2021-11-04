import gql from "graphql-tag";
import * as compose from "lodash.flowright";
import { Alert, withProps } from "modules/common/utils";
import React from "react";
import { graphql } from "react-apollo";
import ForgotPassword from "../components/ForgotPassword";
import { mutations } from "../graphql";
import {
  ForgotPasswordMutationResponse,
  ForgotPasswordMutationVariables,
} from "../types";
import withCurrentUser from "./withCurrentUser";
import { IConfig } from "types";

type Props = {
  currentConfig: IConfig;
};

type FinalProps = Props & ForgotPasswordMutationResponse;

const ForgotPasswordContainer = (props: FinalProps) => {
  const { forgotPasswordMutation } = props;

  const forgotPassword = (variables) => {
    forgotPasswordMutation({ variables })
      .then(() => {
        Alert.success(
          "Further instructions have been sent to your e-mail address."
        );
      })
      .catch((error) => {
        Alert.error(error.message);
      });
  };

  const updatedProps = {
    ...props,
    forgotPassword,
  };

  return <ForgotPassword {...updatedProps} />;
};

export default withProps<Props>(
  compose(
    graphql<
      Props,
      ForgotPasswordMutationResponse,
      ForgotPasswordMutationVariables
    >(gql(mutations.forgotPassword), {
      name: "forgotPasswordMutation",
    })
  )(withCurrentUser(ForgotPasswordContainer))
);
