import { IComponent } from 'modules/types';
import { useEffect } from 'react';
import { useConfigsContext } from './containers/Configs';
import { useRouter } from 'next/router';
import Loading from 'modules/common/ui/Loading/index';

const CheckAuth: IComponent = ({ children }) => {
  const { currentUser } = useConfigsContext();
  const router = useRouter();
  const LOGIN = '/login';

  // useEffect(() => {
  //   if (!currentUser && router.pathname !== LOGIN) {
  //     router.push(LOGIN);
  //   }
  // }, [currentUser, router]);

  // if (currentUser || router.pathname === LOGIN)
  return <>{children}</>;

  return <Loading className="h-100vh primary" />;
};

export default CheckAuth;
