import "abortcontroller-polyfill/dist/polyfill-patch-fetch";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import "erxes-icon/css/erxes.min.css";
// global style
import "modules/common/styles/global-styles.ts";
import "./print.css";
import { getEnv } from "./utils";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(utc, { parseLocal: true });

const target = document.querySelector("#root");
const envs = getEnv();

fetch(`${envs.REACT_APP_API_URL}/pl:posclient/initial-setup?envs=${JSON.stringify(envs)}`, {
  credentials: "include",
})
  .then((response) => response.text())
  .then((res) => {
    const apolloClient = require("./apolloClient").default;
    const { Description } = require("modules/auth/components/InitialSetup");
    const InitialSetup =
      require("modules/auth/containers/InitialSetup").default;
    const Routes = require("./routes").default;
    const AuthLayout = require("modules/layout/components/AuthLayout").default;

    let body = <Routes />;

    if (res === "no config found") {
      body = (
        <AuthLayout
          col={{ first: 5, second: 6 }}
          content={<InitialSetup />}
          description={<Description />}
        />
      );
    }

    return render(
      <ApolloProvider client={apolloClient}>{body}</ApolloProvider>,
      target
    );
  })
  .catch(() => {
    console.log("err");
  });
