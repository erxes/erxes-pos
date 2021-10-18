import { AppConsumer } from 'appContext';
import { IUser } from 'modules/auth/types';
import { __ } from 'modules/common/utils';
import { Divider, Row, RowTitle } from 'modules/common/styles/main';
import React from 'react';
import { Route } from 'react-router-dom';
import pluginModules from './plugins';
import { ISubNav } from './types';

export const pluginsOfRoutes = (currentUser: IUser) => {
  const plugins: any = [];
  const pluginRoutes: any = [];
  const specialPluginRoutes: any = [];

  for (const pluginName of Object.keys(pluginModules)) {
    const plugin = pluginModules[pluginName]();

    plugins.push({
      name: pluginName,
      ...plugin
    });

    if (plugin.response) {
      const Component = plugin.response;
      specialPluginRoutes.push(
        <Component key={Math.random()} currentUser={currentUser} />
      );
    }

    if (plugin.routes) {
      for (const route of plugin.routes) {
        const { component } = route;
        const path = `/${pluginName}${route.path}`;

        pluginRoutes.push(
          <Route key={path} exact={true} path={path} component={component} />
        );
      }
    }
  }

  return { plugins, pluginRoutes, specialPluginRoutes };
};

const PluginsWrapper = ({
  itemName,
  callBack
}: {
  itemName: string;
  callBack: (plugin: any, item: any) => React.ReactNode;
}) => {
  return (
    <AppConsumer>
      {({ plugins }) =>
        plugins.map(plugin => {
          const item = plugin[itemName];

          if (!item) {
            return undefined;
          }

          return callBack(plugin, item);
        })
      }
    </AppConsumer>
  );
};

export const pluginsOfNavigations = (
  renderNavItem: (
    permission: string,
    text: string,
    url: string,
    icon: string,
    childrens?: ISubNav[],
    label?: React.ReactNode
  ) => React.ReactNode
) => {
  return (
    <PluginsWrapper
      itemName={'menu'}
      callBack={(plugin, menu) => {
        return renderNavItem(
          menu.permission,
          menu.label,
          `/${plugin.name}${menu.link}`,
          menu.icon
        );
      }}
    />
  );
};

const renderSettings = (
  plugins: any[],
  renderBox: (
    name: string,
    image: string,
    to: string,
    action: string,
    permissions?: string[]
  ) => React.ReactNode
) => {
  let hasPluginsSettings = false;

  const pluginsBoxs = plugins.map(plugin => {
    const item = plugin.settings;

    if (!item) {
      return undefined;
    }

    hasPluginsSettings = true;
    const pluginSettings: React.ReactNode[] = [];
    for (const perSettings of plugin.settings) {
      pluginSettings.push(
        <span key={Math.random()}>
          {renderBox(
            perSettings.name,
            perSettings.image,
            perSettings.to,
            perSettings.action,
            perSettings.permissions
          )}
        </span>
      );
    }
    return pluginSettings;
  });

  if (!hasPluginsSettings) {
    return undefined;
  }

  return (
    <>
      <Divider />
      <Row>
        <RowTitle>{__('Plugins Settings')}</RowTitle>
        <div id={'PluginsSettings'}>{pluginsBoxs}</div>
      </Row>
    </>
  );
};

export const pluginsOfSettings = (
  renderBox: (
    name: string,
    image: string,
    to: string,
    action: string,
    permissions?: string[]
  ) => React.ReactNode
) => {
  return (
    <AppConsumer>
      {({ plugins }) => <>{renderSettings(plugins, renderBox)}</>}
    </AppConsumer>
  );
};
