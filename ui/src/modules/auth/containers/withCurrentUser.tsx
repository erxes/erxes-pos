import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import Spinner from '../../common/components/Spinner';
import { storeConstantToStore } from '../../../utils';
import { withProps } from '../../utils';
import React from 'react';
import { graphql } from 'react-apollo';
import { queries } from '../graphql/index';
import { CurrentUserQueryResponse } from '../types';
import { CurrentConfigQueryResponse } from '../../../types';

type Props = {
  currentUserQuery: CurrentUserQueryResponse;
  currentConfigQuery: CurrentConfigQueryResponse
};

const withCurrentUser = Component => {
  const Container = (props: Props) => {
    const { currentUserQuery, currentConfigQuery } = props;

    if (currentUserQuery.loading || currentConfigQuery.loading) {
      return <Spinner />;
    }

    const currentUser = currentUserQuery.currentUser;

    // useEffect(() => {
    //   currentUserQuery.subscribeToMore({
    //     document: gql(userChanged),
    //     variables: { userId: currentUser ? currentUser._id : null },
    //     updateQuery: () => {
    //       currentUserQuery.refetch();
    //     }
    //   });
    // });

    const updatedProps = {
      ...props,
      currentUser,
      currentConfig: currentConfigQuery.currentConfig
    };

    if (currentUser) {
      const constants = currentUser.configsConstants || [];

      constants.forEach(c => storeConstantToStore(c.key, c.values));
    }

    return <Component {...updatedProps} />;
  };

  return withProps<{}>(
    compose(
      graphql<CurrentUserQueryResponse>(gql(queries.currentUser), {
        name: 'currentUserQuery'
      }),
      graphql<CurrentConfigQueryResponse>(gql(queries.currentConfig), {
        name: 'currentConfigQuery'
      })
    )(Container)
  );
};

export default withCurrentUser;
