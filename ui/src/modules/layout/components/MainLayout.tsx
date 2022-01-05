import { IUser } from "modules/auth/types";
import { IRouterProps, IConfig } from "../../../types";
import { bustIframe } from "modules/common/utils";
import React from "react";
import { withRouter } from "react-router-dom";
import {
  Layout,
  MainWrapper,
  Bottom,
  NavItem,
  NavIcon,
  PortraitWrapper,
} from "../styles";
import DetectBrowser from "./DetectBrowser";
import Navigation from "./Navigation";
import { setHeader } from "modules/utils";
import Tip from "modules/common/components/Tip";

interface IProps extends IRouterProps {
  posCurrentUser?: IUser;
  currentConfig?: IConfig;
  orientation: string;
  children: React.ReactNode;
  logout: () => void;
}

class MainLayout extends React.Component<IProps, { isCollapsed: boolean }> {
  constructor(props) {
    super(props);
    const hasWideNav = localStorage.getItem("navigation");

    this.state = {
      isCollapsed: hasWideNav ? (hasWideNav === "true" ? true : false) : false,
    };
  }

  componentDidMount() {
    const { history, posCurrentUser, currentConfig } = this.props;

    if (history.location.pathname !== "/reset-password" && !posCurrentUser) {
      history.push("/sign-in");
    }

    // click-jack attack defense
    bustIframe();
    setHeader(currentConfig || ({} as IConfig));
  }

  componentDidUpdate() {
    setHeader(this.props.currentConfig || ({} as IConfig));
  }

  onCollapseNavigation = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed }, () => {
      localStorage.setItem("navigation", this.state.isCollapsed.toString());
    });
  };

  render() {
    const {
      children,
      posCurrentUser,
      currentConfig,
      logout,
      location
    } = this.props;
    const { isCollapsed } = this.state;

    if (["kiosk", "waiting"].includes(localStorage.getItem('erxesPosMode') || '') || location.pathname.includes('waiting-screen')) {
      return (
        <>
          <div id="anti-clickjack" style={{ display: "none" }} />
          <Layout>
            <PortraitWrapper>{children}</PortraitWrapper>
          </Layout>
        </>
      );
    }

    return (
      <>
        <div id="anti-clickjack" style={{ display: "none" }} />
        <Layout>
          {posCurrentUser && (
            <Navigation
              posCurrentUser={posCurrentUser}
              currentConfig={currentConfig}
              options={currentConfig ? currentConfig.uiOptions : {}}
              collapsed={isCollapsed}
              onCollapseNavigation={this.onCollapseNavigation}
            />
          )}
          <MainWrapper collapsed={isCollapsed} className="main-wrapper">
            {children}
          </MainWrapper>
          <DetectBrowser />
        </Layout>

        <Bottom onClick={logout} className="logout">
          <Tip placement="right" key={Math.random()} text="Sign out">
            <NavItem>
              <NavIcon className="icon-logout-2" />
            </NavItem>
          </Tip>
        </Bottom>
      </>
    );
  }
}

export default withRouter(MainLayout);
