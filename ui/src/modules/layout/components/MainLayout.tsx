import { IUser } from "modules/auth/types";
import { IRouterProps, IConfig } from "../../../types";
import { bustIframe } from "modules/common/utils";
import React from "react";
import { withRouter } from "react-router-dom";
import {
  Layout,
  MainWrapper,
  // Bottom,
  // NavItem,
  // NavIcon,
  PortraitWrapper,
} from "../styles";
import DetectBrowser from "./DetectBrowser";
import { setHeader } from "modules/utils";
// import Tip from "modules/common/components/Tip";

interface IProps extends IRouterProps {
  posCurrentUser?: IUser;
  currentConfig?: IConfig;
  orientation: string;
  children: React.ReactNode;
  logout: () => void;
}

class MainLayout extends React.Component<IProps> {
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

  render() {
    const { children, location } = this.props;

    if (
      ["kiosk", "waiting"].includes(
        localStorage.getItem("erxesPosMode") || ""
      ) ||
      location.pathname.includes("waiting-screen")
    ) {
      return (
        <div className="subRoot">
          <div id="anti-clickjack" style={{ display: "none" }} />
          <Layout>
            <PortraitWrapper>{children}</PortraitWrapper>
            <DetectBrowser />
          </Layout>
        </div>
      );
    }

    return (
      <>
        <div id="anti-clickjack" style={{ display: "none" }} />
        <Layout>
          <MainWrapper className="main-wrapper">{children}</MainWrapper>
          <DetectBrowser />
        </Layout>

        {/* <Bottom onClick={logout} className="logout">
          <Tip placement="right" key={Math.random()} text="Гарах">
            <NavItem>
              <NavIcon className="icon-logout-2" />
              <b>{__("ГАРАХ")}</b>
            </NavItem>
          </Tip>
        </Bottom> */}
      </>
    );
  }
}

export default withRouter(MainLayout);
