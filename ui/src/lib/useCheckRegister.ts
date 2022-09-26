import { gql, useLazyQuery } from '@apollo/client';
import { queries } from 'modules/checkout/graphql';
import { useApp } from 'modules/AppContext';
import { useEffect } from 'react';

const useCheckRegister = () => {
  const { registerNumber, companyName, setCompanyName } = useApp();
  const [check, { loading, refetch, error }] = useLazyQuery(
    gql(queries.ordersCheckCompany),
    {
      onCompleted(data) {
        setCompanyName(data.ordersCheckCompany);
      },
      fetchPolicy: 'network-only',
    }
  );

  useEffect(() => {
    if (companyName) {
      setCompanyName('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerNumber]);

  const checkRegister = () => {
    if (registerNumber.length === 7) {
      check({
        variables: { registerNumber },
      });
    }
  };

  return {
    name: companyName,
    loading,
    checkRegister,
    refetch,
    setCompanyName,
    error,
  };
};

export default useCheckRegister;
