import gql from "graphql-tag";
import * as compose from "lodash.flowright";
import Spinner from "../../common/components/Spinner";
import { storeConstantToStore } from "../../../utils";
import { withProps } from "../../utils";
import React from "react";
import { graphql } from "react-apollo";
import { queries } from "../graphql/index";
import { CurrentUserQueryResponse } from "../types";
import { CurrentConfigQueryResponse } from "../../../types";

type Props = {
  currentUserQuery: CurrentUserQueryResponse;
  currentConfigQuery: CurrentConfigQueryResponse;
};

const withCurrentUser = (Component) => {
  const Container = (props: Props) => {
    const [orientation, setPortraitOrientation] = React.useState("landscape");
    const { currentUserQuery, currentConfigQuery } = props;

    React.useEffect(
      () => {
        if (
          typeof window !== "undefined" &&
          window.innerHeight > window.innerWidth
        ) {
          setPortraitOrientation("portrait");
        }
      },
      [orientation, window] as any
    );

    if (currentUserQuery.loading || currentConfigQuery.loading) {
      return <Spinner />;
    }

    const currentUser = currentUserQuery.currentUser;

    const updatedProps = {
      ...props,
      currentUser,
      orientation,
      currentConfig: currentConfigQuery.currentConfig,
    };

    if (currentUser) {
      const constants = currentUser.configsConstants || [];

      constants.forEach((c) => storeConstantToStore(c.key, c.values));
    }

    return <Component {...updatedProps} />;
  };

  return withProps<{}>(
    compose(
      graphql<CurrentUserQueryResponse>(gql(queries.currentUser), {
        name: "currentUserQuery",
      }),
      graphql<CurrentConfigQueryResponse>(gql(queries.currentConfig), {
        name: "currentConfigQuery",
      })
    )(Container)
  );
};

export default withCurrentUser;
