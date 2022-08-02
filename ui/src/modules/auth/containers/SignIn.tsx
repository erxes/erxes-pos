import apolloClient from 'apolloClient';
import ButtonMutate from '../../common/components/ButtonMutate';
import client from 'apolloClient';
import gql from 'graphql-tag';
import React from 'react';
import SignIn from '../components/SignIn';
import withCurrentUser from './withCurrentUser';
import { __ } from 'modules/common/utils';
import { IButtonMutateProps, IConfig, IRouterProps } from '../../../types';
import { mutations, queries } from '../graphql';
import { withRouter } from 'react-router-dom';

type Props = {
  currentConfig: IConfig;
  configs: IConfig[];
} & IRouterProps;

const SignInContainer = (props: Props) => {
  const { history, configs } = props;

  const renderButton = ({ values, isSubmitted }: IButtonMutateProps) => {
    const callbackResponse = () => {
      apolloClient.resetStore();

      history.push("/?signedIn=true");

      window.location.reload();
    };

    return (
      <ButtonMutate
        mutation={mutations.login}
        variables={values}
        callback={callbackResponse}
        isSubmitted={isSubmitted}
        type="submit"
        block={true}
        icon="none"
      >
        {__("Sign in")}
      </ButtonMutate>
    );
  };

  const onChangeConfig = (token) => {
    client.mutate({
      mutation: gql(mutations.chooseConfig),
      variables: { token },
      refetchQueries: [
        {
          query: gql(queries.currentConfig),
        }
      ]
    })
  }

  const updatedProps = {
    ...props,
    renderButton,
    onChangeConfig,
    configs
  };

  return <SignIn {...updatedProps} />;
};

export default withCurrentUser(withRouter(SignInContainer));
