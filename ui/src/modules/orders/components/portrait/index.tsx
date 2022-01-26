import React from "react";
import { Link } from "react-router-dom";

import { ICustomerParams, IOrder } from "../../types";
import { IUser } from "modules/auth/types";
import { IConfig } from "types";
import { IPaymentParams } from "../../containers/PosContainer";
import {
  LogoWrapper,
  ChooseType,
  Footer,
  PortraitViewWrapper,
  Type,
  AppWrapper,
} from "./style";
import Icon from "modules/common/components/Icon";
import { FlexBetween, FlexCenter } from "modules/common/styles/main";
import { __ } from "modules/common/utils";
import Pos from "../Pos";

type Props = {
  createOrder: (params) => void;
  posCurrentUser: IUser;
  currentConfig: IConfig;
  order: IOrder | null;
  orientation: string;
  updateOrder: (params) => Promise<IOrder>;
  makePayment: (_id: string, params: IPaymentParams) => void;
  productCategoriesQuery: any;
  productsQuery: any;
  addCustomer: (params: ICustomerParams) => void;
  qp: any;
  setCardPaymentInfo: (params: any) => void;
};

type State = {
  type: string;
};

export default class PortraitView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      type: "",
    };
  }

  onClickType = (type: string) => {
    this.setState({ type });
  };

  renderContent(color) {
    return (
      <ChooseType>
        <h4>
          Та үйлчилгээний <br /> төрлөө сонгоно уу?
        </h4>
        <FlexCenter>
          <Type color={color} onClick={() => this.onClickType("take")}>
            <img src="images/type1.png" alt="type" />
            {__("Take")}
          </Type>
          <Type color={color} onClick={() => this.onClickType("eat")}>
            <img src="images/type2.png" alt="type" />
            {__("Eat")}
          </Type>
        </FlexCenter>
        <AppWrapper>
          <img src="/images/yoshinaya-app.png" alt="app" />
          <FlexCenter>
            <img className="app-download" src="/images/ios.png" alt="ios" />
            <img
              className="app-download"
              src="/images/android.png"
              alt="android"
            />
          </FlexCenter>
        </AppWrapper>
      </ChooseType>
    );
  }

  render() {
    const { currentConfig } = this.props;
    const { type } = this.state;
    const { colors, logo, texts = {} } = currentConfig.uiOptions || ({} as any);

    if (type) {
      return (
        <Pos
          {...this.props}
          type={this.state.type}
        ></Pos>
      );
    }

    return (
      <PortraitViewWrapper>
        <LogoWrapper>
          <Link to="/">
            <img src={logo ? logo : `/images/logo-dark.png`} alt="logo" />
          </Link>
        </LogoWrapper>
        {this.renderContent(colors.primary)}
        <Footer color={colors.primary}>
          <FlexBetween>
            <span>
              <Icon icon="earthgrid" /> {texts && texts.website || ''}
            </span>
            <span>
              <Icon icon="phone" /> {texts && texts.phone || ''}
            </span>
          </FlexBetween>
        </Footer>
      </PortraitViewWrapper>
    );
  } // end render()
}
