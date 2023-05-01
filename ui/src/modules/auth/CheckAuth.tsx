/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useConfigsContext } from './containers/Configs';
import { useRouter } from 'next/router';
import Loading from 'modules/common/ui/Loading/index';
import Empty from 'modules/common/ui/Empty';

const checkValidAuth = (currentUser: any, currentConfig: any) => {
  if (!(currentUser && currentUser._id)) {
    return false;
  }

  if (!(currentConfig && currentConfig._id)) {
    return false;
  }

  if (![...currentConfig.cashierIds, ...currentConfig.adminIds].includes(currentUser._id)) {
    return false;
  }

  return true;
}

const CheckAuth = ({ children }: any) => {
  const { currentUser, configs, currentConfig } = useConfigsContext();
  const router = useRouter();
  const LOGIN = '/login';

  const checkConfigs = Array.isArray(configs) && !!configs.length;
  const checkConfigsPath = router.pathname !== '/init';

  useEffect(() => {
    if (!checkConfigs) {
      if (checkConfigsPath) {
        router.push({ pathname: '/init' });
      }
    } else {
      const checkValid = checkValidAuth(currentUser, currentConfig);

      if (!checkValid && router.pathname !== LOGIN) {
        router.push(LOGIN);
        return;
      }

      if (checkValid && router.pathname === LOGIN) {
        router.push('/');
      }

      if (!checkConfigsPath) {
        router.push('/');
      }
    }
  }, [currentUser, router.pathname, checkConfigs, currentConfig]);

  if (!Array.isArray(configs))
    return (
      <div className="h-100vh flex-center flex-col">
        <h5>Network Error</h5>
        <br />
        <Empty text="Сервертэй холбогдоход алдаа гарлаа" fill={false} />
      </div>
    );

  if (!checkConfigs) return checkConfigsPath ? null : children;

  const checkValid = checkValidAuth(currentUser, currentConfig)

  if (checkValid && router.pathname === LOGIN) return null;
  if (checkValid || router.pathname === LOGIN) return <>{children}</>;

  return <Loading className="h-100vh primary" />;
};

export default CheckAuth;
