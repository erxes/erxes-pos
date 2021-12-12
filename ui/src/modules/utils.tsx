import React from "react";
import { IConfig, IEbarimtConfig } from "types";
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
  const { uiOptions = {}, name = "erxes Inc" } =
    currentConfig || ({} as IConfig);

  setTitle(
    name,
    name === `${"Team Inbox"}` && document.title.startsWith("(1)")
  );
  favicon.href = uiOptions ? uiOptions.favIcon : '' || "/favicon.png";
};

export const calcTaxAmount = (amount: number, config?: IEbarimtConfig) => {
  let taxPercent = 0;

  if (!config) {
    return {
      vatAmount: 0,
      cityTaxAmount: 0
    };
  }

  if (config.hasVat) {
    taxPercent += 10;
  }
  if (config.hasCitytax) {
    taxPercent += 1;
  }

  return {
    vatAmount: amount / (100 + taxPercent) * 10,
    cityTaxAmount: amount / (100 + taxPercent) * 1
  };
};
