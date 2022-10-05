import { useEffect, useMemo } from 'react';
import { queries } from '../graphql';
import { useQuery, gql } from '@apollo/client';
import { FC, ReactNode, createContext, useContext } from 'react';
import Loading from 'modules/common/ui/Loading';

interface IProps {
  children: ReactNode | [ReactNode];
}
interface State {
  currentUser: any;
  currentConfig: any;
  configs: [any];
  allowReceivable: boolean;
  allowInnerBill: boolean;
}

export const ConfigsContext = createContext<State | any>(null);

ConfigsContext.displayName = 'ConfigsContext';

const ConfigsProvider: FC<IProps> = ({ children }) => {
  const { data, loading } = useQuery(gql(queries.posCurrentUser));
  const { data: config, loading: loadingConfig } = useQuery(
    gql(queries.currentConfig)
  );
  const { data: configs, loading: loadingConfigs } = useQuery(
    gql(queries.configs)
  );

  const currentUser = (data || {}).posCurrentUser;
  const currentConfig = (config || {}).currentConfig;
  const { posclientConfigs } = configs || {};

  const { uiOptions } = currentConfig || {};

  const primary = ((uiOptions || {}).colors || {}).primary;

  const logoUrl = ((uiOptions || {}).colors || {}).primary;

  let allowReceivable = false;
  let allowInnerBill = false;

  if (currentConfig && currentConfig.permissionConfig && currentUser) {
    if ((currentConfig.adminIds || []).includes(currentUser._id)) {
      if (currentConfig.permissionConfig.admins) {
        if (currentConfig.permissionConfig.admins.allowReceivable) {
          allowReceivable = true;
        }
        if (currentConfig.permissionConfig.admins.isTempBill) {
          allowInnerBill = true;
        }
      }
    } else {
      if (currentConfig.permissionConfig.cashiers) {
        if (currentConfig.permissionConfig.cashiers.allowReceivable) {
          allowReceivable = true;
        }

        if (currentConfig.permissionConfig.cashiers.isTempBill) {
          allowInnerBill = true;
        }
      }
    }
  }

  useEffect(() => {
    if (primary) {
      document.documentElement.style.setProperty('--primary', primary);
    }
  }, [primary]);

  const value = useMemo(
    () => ({
      configs: posclientConfigs,
      currentUser,
      currentConfig,
      primaryColor: primary,
      allowReceivable,
      allowInnerBill,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser, currentConfig, posclientConfigs]
  );

  if (loading || loadingConfig || loadingConfigs)
    return <Loading className="h-100vh" />;

  return (
    <ConfigsContext.Provider value={value}>{children}</ConfigsContext.Provider>
  );
};

export const useConfigsContext = () => {
  const context = useContext<State>(ConfigsContext);
  if (context === undefined) {
    throw new Error(`useConfigsContext must be used within a ConfigsProvider`);
  }
  return context;
};

export default ConfigsProvider;
