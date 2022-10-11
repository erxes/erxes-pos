import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { mutations } from '../graphql';
import Input from 'ui/Input';
import Button from 'ui/Button';

const PosConfigsFetch = () => {
  const [token, setToken] = useState('');

  const [posConfigsFetch, { loading }] = useMutation(
    gql(mutations.configsFetch),
    {
      onCompleted() {
        window.location.href = '/login';
      },
    }
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    posConfigsFetch({
      variables: { token },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="token">Token</label>
      <Input value={token} onChange={(val: string) => setToken(val)} />
      <small className="warning">
        Erxes-ийн посын тохиргооноос токенийг хуулж тавина уу
      </small>
      <Button loading={loading}>INIT</Button>
    </form>
  );
};

export default PosConfigsFetch;
