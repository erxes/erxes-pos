/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useConfigsContext } from './containers/Configs';
import { useRouter } from 'next/router';
import Loading from 'modules/common/ui/Loading/index';
import Empty from 'modules/common/ui/Empty';

const CheckAuth = ({ children }: any) => {
  const { currentUser, configs } = useConfigsContext();
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
      if (!currentUser && router.pathname !== LOGIN) {
        router.push(LOGIN);
        return;
      }
      if (currentUser && router.pathname === LOGIN) {
        router.push('/');
      }

      if (!checkConfigsPath) {
        router.push('/');
      }
    }
  }, [currentUser, router.pathname, checkConfigs]);

  if (!Array.isArray(configs))
    return (
      <div className="h-100vh flex-center flex-col">
        <h5>Network Error</h5>
        <br />
        <Empty text="Сервертэй холбогдоход алдаа гарлаа" fill={false} />
      </div>
    );

  if (!checkConfigs) return checkConfigsPath ? null : children;

  if (currentUser && router.pathname === LOGIN) return null;
  if (currentUser || router.pathname === LOGIN) return <>{children}</>;

  return <Loading className="h-100vh primary" />;
};

export default CheckAuth;
