import { queries } from '../graphql';
import { Query } from 'modules/utils';
import { FC, ReactNode, createContext, useMemo, useContext } from 'react';
import Loading from 'ui/Loading';

interface IProps {
  children: ReactNode | [ReactNode];
}
interface State {
  currentUser: any;
  currentConfig: any;
  configs: [any];
}

const withQuery = (name: string) => Query(queries, name);

export const ConfigsContext = createContext<State | any>(null);

ConfigsContext.displayName = 'ConfigsContext';

const ConfigsProvider: FC<IProps> = ({ children }) => {
  const currentUserQuery = withQuery('posCurrentUser');
  const currentConfigQuery = withQuery('currentConfig');
  const configsQuery = withQuery('configs');

  if (
    currentUserQuery.loading ||
    currentConfigQuery.loading ||
    configsQuery.loading
  )
    return <Loading className="h-100vh" />;

  const currentUser = currentUserQuery.data.posCurrentUser;
  const currentConfig = currentConfigQuery.data.currentConfig;
  const configs = configsQuery.data.posclientConfigs;

  const value = { currentUser, currentConfig, configs };

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
