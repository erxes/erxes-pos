import { useEffect } from 'react';
import { queries } from '../graphql';
import { useQuery, gql } from '@apollo/client';
import { FC, ReactNode, createContext, useContext } from 'react';
import Loading from 'modules/common/ui/Loading';
import type { ConfigsState } from 'modules/types';
import { setLocal, strToObj } from 'modules/utils';

interface IProps {
  children: ReactNode | [ReactNode];
}

export const ConfigsContext = createContext<ConfigsState | any>(null);

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
  const { uiOptions, paymentTypes } = currentConfig || {};

  const {
    colors,
    logo: logoUrl,
    bgImage,
    receiptIcon,
    kioskHeaderImage,
  } = uiOptions || {};

  const primary = (colors || {}).primary;

  let allowInnerBill = false;

  if (currentConfig && currentConfig.permissionConfig && currentUser) {
    if ((currentConfig.adminIds || []).includes(currentUser._id)) {
      if (currentConfig.permissionConfig.admins) {
        if (currentConfig.permissionConfig.admins.isTempBill) {
          allowInnerBill = true;
        }
      }
    } else {
      if (currentConfig.permissionConfig.cashiers) {
        if (currentConfig.permissionConfig.cashiers.isTempBill) {
          allowInnerBill = true;
        }
      }
    }
  }

  if (currentConfig && currentConfig.allowTypes && currentConfig.allowTypes.length) {
    setLocal('defaultType', currentConfig.allowTypes[0]);
  }

  useEffect(() => {
    if (primary) {
      document.documentElement.style.setProperty('--primary', primary);
    }
  }, [primary]);

  const value = {
    configs: posclientConfigs,
    paymentTypes: (paymentTypes || []).map((pt: any) => ({
      ...(pt || {}),
      config: strToObj(pt?.config || ''),
    })),
    currentUser,
    currentConfig,
    primaryColor: primary || '#4f33af',
    allowInnerBill,
    logoUrl,
    receiptIcon,
    bgImage,
    kioskHeaderImage,
  };

  if (loading || loadingConfig || loadingConfigs)
    return <Loading className="h-100vh" />;

  return (
    <ConfigsContext.Provider value={value}>{children}</ConfigsContext.Provider>
  );
};

export const useConfigsContext = () => {
  const context = useContext<ConfigsState>(ConfigsContext);
  if (context === undefined) {
    throw new Error(`useConfigsContext must be used within a ConfigsProvider`);
  }
  return context;
};

export default ConfigsProvider;
