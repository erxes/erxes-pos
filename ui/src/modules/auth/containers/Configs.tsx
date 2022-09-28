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
}

export const ConfigsContext = createContext<State | any>(null);

ConfigsContext.displayName = 'ConfigsContext';

const ConfigsProvider: FC<IProps> = ({ children }) => {
  const { data, loading } = useQuery(gql(queries.posCurrentUser));
  const { data: config, loading: loadingConfig } = useQuery(
    gql(queries.currentConfig)
  );

  if (loading || loadingConfig) return <Loading className="h-100vh" />;

  const currentUser = (data || {}).posCurrentUser;
  const currentConfig = (config || {}).currentConfig;

  const value = { currentUser, currentConfig };

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
