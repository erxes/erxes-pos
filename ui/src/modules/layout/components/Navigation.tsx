import { IUser } from "modules/auth/types";
import WithPermission from "modules/common/components/WithPermission";
import { __, setBadge } from "modules/common/utils";
import { pluginsOfNavigations } from "pluginUtils";
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LeftNavigation,
  NavIcon,
  Nav,
  SubNav,
  NavItem,
  SubNavTitle,
  SubNavItem,
  DropSubNav,
  DropSubNavItem,
} from "../styles";
import Tip from "modules/common/components/Tip";
import { IConfig } from "types";

export interface ISubNav {
  permission: string;
  link: string;
  value: string;
  icon: string;
  additional?: boolean;
}

type IProps = {
  unreadConversationsCount?: number;
  collapsed: boolean;
  onCollapseNavigation: () => void;
  currentConfig?: IConfig;
  currentUser: IUser;
  options: any;
};

class Navigation extends React.Component<IProps> {
  componentWillReceiveProps(nextProps) {
    const unreadCount = nextProps.unreadConversationsCount;

    if (unreadCount !== this.props.unreadConversationsCount) {
      setBadge(unreadCount, __("Team Inbox").toString());
    }
  }

  getLink = (url) => {
    const storageValue = window.localStorage.getItem("pagination:perPage");

    let parsedStorageValue;

    try {
      parsedStorageValue = JSON.parse(storageValue || "");
    } catch {
      parsedStorageValue = {};
    }

    if (url.includes("?")) {
      const pathname = url.split("?")[0];

      if (!url.includes("perPage") && parsedStorageValue[pathname]) {
        return `${url}&perPage=${parsedStorageValue[pathname]}`;
      }
      return url;
    }

    if (parsedStorageValue[url]) {
      return `${url}?perPage=${parsedStorageValue[url]}`;
    }

    return url;
  };

  renderSubNavItem = (child, index: number) => {
    return (
      <WithPermission key={index} action={child.permission}>
        <SubNavItem additional={child.additional || false}>
          <NavLink to={this.getLink(child.link)}>
            <i className={child.icon} />
            {__(child.value)}
          </NavLink>
        </SubNavItem>
      </WithPermission>
    );
  };

  renderChildren(
    collapsed: boolean,
    url: string,
    text: string,
    childrens?: ISubNav[]
  ) {
    if (!childrens || childrens.length === 0) {
      return null;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const parent = urlParams.get("parent");

    if (
      collapsed &&
      (parent === url || window.location.pathname.startsWith(url))
    ) {
      return (
        <DropSubNav>
          {childrens.map((child, index) => (
            <WithPermission key={index} action={child.permission}>
              <DropSubNavItem>
                <NavLink to={this.getLink(`${child.link}?parent=${url}`)}>
                  <i className={child.icon} />
                  {__(child.value)}
                </NavLink>
              </DropSubNavItem>
            </WithPermission>
          ))}
        </DropSubNav>
      );
    }

    return (
      <SubNav collapsed={collapsed}>
        {!collapsed && <SubNavTitle>{__(text)}</SubNavTitle>}
        {childrens.map((child, index) => this.renderSubNavItem(child, index))}
      </SubNav>
    );
  }

  renderNavItem = (
    permission: string,
    text: string,
    url: string,
    icon: string,
    childrens?: ISubNav[],
    label?: React.ReactNode
  ) => {
    const { collapsed } = this.props;

    const item = (
      <NavItem>
        <NavLink to={this.getLink(url)}>
          <NavIcon className={icon} />
          {collapsed && <label>{__(text)}</label>}
          {label}
        </NavLink>
        {this.renderChildren(collapsed, url, text, childrens)}
      </NavItem>
    );

    if (!childrens || childrens.length === 0) {
      if (!collapsed) {
        return (
          <WithPermission key={url} action={permission}>
            <Tip placement="right" key={Math.random()} text={__(text)}>
              {item}
            </Tip>
          </WithPermission>
        );
      }
    }

    return (
      <WithPermission key={url} action={permission}>
        {item}
      </WithPermission>
    );
  };

  renderSyncMenu() {
    const { currentUser } = this.props;

    if (!currentUser) {
      return "";
    }

    if (localStorage.getItem("erxesPosMode")) {
      return "";
    }

    return (
      <NavLink to="/settings">
        <NavIcon className={"icon-sync-exclamation"} />
      </NavLink>
    );
  }

  renderKitchenMenu() {
    const { currentUser, currentConfig } = this.props;

    if (!currentUser || !currentConfig) {
      return "";
    }

    if (!currentConfig.kitchenScreen) {
      return "";
    }

    if (!["", "kitchen"].includes(localStorage.getItem("erxesPosMode") || "")) {
      return "";
    }

    return (
      <NavLink to="/kitchen-screen">
        <NavIcon className={"icon-wallclock"} />
      </NavLink>
    );
  }

  renderWaitingMenu() {
    const { currentUser, currentConfig } = this.props;

    if (!currentUser || !currentConfig) {
      return "";
    }

    if (!currentConfig.waitingScreen) {
      return "";
    }

    if (!["", "waiting"].includes(localStorage.getItem("erxesPosMode") || "")) {
      return "";
    }

    return (
      <NavLink to="/waiting-screen">
        <NavIcon className={"icon-presentation"} />
      </NavLink>
    );
  }

  render() {
    const { collapsed, options } = this.props;
    const logo = collapsed ? "logo.png" : "erxes.png";

    return (
      <LeftNavigation collapsed={collapsed} color={options.colors.primary}>
        <NavLink to="/">
          <img src={options.logo || `/images/${logo}`} alt="logo" />
        </NavLink>
        {this.renderSyncMenu()}
        {this.renderKitchenMenu()}
        {this.renderWaitingMenu()}
        <Nav id="navigation" collapsed={collapsed}>
          {pluginsOfNavigations(this.renderNavItem)}
        </Nav>
      </LeftNavigation>
    );
  }
}

export default Navigation;
