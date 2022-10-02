import gql from "graphql-tag";
import * as compose from "lodash.flowright";
import Spinner from "../../common/components/Spinner";
import { storeConstantToStore } from "../../../utils";
import { withProps } from "../../utils";
import React from "react";
import { graphql } from "react-apollo";
import { queries } from "../graphql/index";
import { CurrentUserQueryResponse } from "../types";
import { ConfigsQueryResponse, CurrentConfigQueryResponse } from '../../../types';

type Props = {
  currentUserQuery: CurrentUserQueryResponse;
  currentConfigQuery: CurrentConfigQueryResponse;
  configsQuery: ConfigsQueryResponse;
}

const withCurrentUser = (Component) => {
  const Container = (props: Props) => {
    const [orientation, setPortraitOrientation] = React.useState("landscape");
    const { currentUserQuery, currentConfigQuery, configsQuery } = props;

    React.useEffect(() => {
      if (
        typeof window !== "undefined" &&
        window.innerHeight > window.innerWidth
      ) {
        setPortraitOrientation("portrait");
      }
    }, [setPortraitOrientation]);

    if (currentUserQuery.loading || currentConfigQuery.loading || configsQuery.loading) {
      return <Spinner />;
    }

    const posCurrentUser = currentUserQuery.posCurrentUser;
    const currentConfig = currentConfigQuery.currentConfig;

    let allowReceivable = false;
    let allowInnerBill = false;

    if (currentConfig.adminIds.includes(posCurrentUser._id)) {
      if (currentConfig.permissionConfig && currentConfig.permissionConfig.admins) {
        if (currentConfig.permissionConfig.admins.allowReceivable) {
          allowReceivable = true;
        }
        if (currentConfig.permissionConfig.admins.isTempBill) {
          allowInnerBill = true;
        }

      }
    } else {
      if (currentConfig.permissionConfig && currentConfig.permissionConfig.cashiers) {
        if (currentConfig.permissionConfig.cashiers.allowReceivable) {
          allowReceivable = true;
        }

        if (currentConfig.permissionConfig.cashiers.isTempBill) {
          allowInnerBill = true;
        }
      }
    }

    const updatedProps = {
      ...props,
      posCurrentUser,
      orientation,
      currentConfig,
      allowReceivable,
      allowInnerBill,
      configs: configsQuery.posclientConfigs || [],
    };

    if (posCurrentUser) {
      const constants = posCurrentUser.configsConstants || [];

      constants.forEach((c) => storeConstantToStore(c.key, c.values));
    }

    return <Component {...updatedProps} />;
  };

  return withProps<{}>(
    compose(
      graphql<CurrentUserQueryResponse>(gql(queries.posCurrentUser), {
        name: "currentUserQuery",
      }),
      graphql<CurrentConfigQueryResponse>(gql(queries.currentConfig), {
        name: "currentConfigQuery",
      }),
      graphql<ConfigsQueryResponse>(gql(queries.configs), {
        name: "configsQuery",
      }),
    )(Container)
  );
};

export default withCurrentUser;
