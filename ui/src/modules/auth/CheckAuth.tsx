import { useEffect } from 'react';
import { useConfigsContext } from './containers/Configs';
import { useRouter } from 'next/router';
import Loading from 'modules/common/ui/Loading/index';

const CheckAuth = ({ children }: any) => {
  const { currentUser, configs } = useConfigsContext();
  const router = useRouter();
  const LOGIN = '/login';

  const checkConfigs = (configs || []).length;
  const checkConfigsPath = router.pathname !== '/chooseConfig';

  useEffect(() => {
    if (!checkConfigs) {
      if (checkConfigsPath) {
        router.push({ pathname: 'chooseConfig' });
      }
    } else {
      if (!currentUser && router.pathname !== LOGIN) {
        router.push(LOGIN);
      }
      if (
        (currentUser && router.pathname === LOGIN) ||
        router.pathname === '/chooseConfig'
      ) {
        router.push('/');
      }
    }
  }, [currentUser, router]);

  if (!checkConfigs) return checkConfigsPath ? null : children;

  if (currentUser && router.pathname === LOGIN) return null;
  if (currentUser || router.pathname === LOGIN) return <>{children}</>;

  return <Loading className="h-100vh primary" />;
};

export default CheckAuth;
