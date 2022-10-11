import { gql, useLazyQuery } from '@apollo/client';
import { queries } from 'modules/checkout/graphql';
import { useApp } from 'modules/AppContext';
import { useEffect } from 'react';
import { NOT_FOUND } from 'modules/constants';
import { getMode } from 'modules/utils';

const useCheckRegister = () => {
  const { registerNumber, companyName, setCompanyName } = useApp();
  const mode = getMode();
  const [check, { loading, refetch, error, data }] = useLazyQuery(
    gql(queries.ordersCheckCompany),
    {
      onCompleted(data) {
        const { name, found } = data.ordersCheckCompany || {};
        if (found) return setCompanyName(name || 'testCompany');
        return setCompanyName(NOT_FOUND);
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
    if (registerNumber.length === 7 || mode === 'pos') {
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
