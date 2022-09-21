import { gql, useLazyQuery } from '@apollo/client';
import { queries } from 'modules/checkout/graphql';
import { useApp } from 'modules/AppContext';
import { useState, useEffect } from 'react';

const useCheckRegister = () => {
  const [name, setName] = useState('');
  const { registerNumber } = useApp();
  const [checkRegister, { loading, refetch, error }] = useLazyQuery(
    gql(queries.ordersCheckCompany),
    {
      onCompleted(data) {
        setName(data.ordersCheckCompany);
      },
      fetchPolicy: 'network-only',
    }
  );

  useEffect(() => {
    if (name) {
      setName('');
    }
    if (registerNumber.length === 7) {
      checkRegister({
        variables: { registerNumber },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerNumber]);

  return {
    name,
    loading,
    checkRegister,
    refetch,
    setName,
    error,
  };
};

export default useCheckRegister;
