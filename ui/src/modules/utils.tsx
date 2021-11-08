import React from "react";
import { IConfig } from "types";
import { setTitle } from "./common/utils";

export function withProps<IProps>(
  Wrapped: new (props: IProps) => React.Component<IProps>
) {
  return class WithProps extends React.Component<IProps, {}> {
    render() {
      return <Wrapped {...this.props} />;
    }
  };
}

export const formatNumber = (num: number) => {
  return Number((num || 0).toFixed(1)).toLocaleString();
};

export const setHeader = (currentConfig: IConfig) => {
  const favicon = document.getElementById("favicon") as HTMLAnchorElement;
  const { uiOptions = {}, name } = currentConfig || ({} as IConfig);
  const title = name || "erxes Inc";

  setTitle(
    title,
    title === `${"Team Inbox"}` && document.title.startsWith("(1)")
  );
  favicon.href = uiOptions.favIcon || "/favicon.png";
};
