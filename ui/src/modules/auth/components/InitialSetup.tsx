import Button from 'modules/common/components/Button';
import { __ } from 'modules/common/utils';
import React from 'react';
import { AuthBox } from '../styles';

type Props = {
  fetchConfigs: () => void;
};

export const OwnerDescription = () => {
  return (
    <>
      <h1>{__('Welcome to erxes POS')}</h1>
      <h2>{__('Erxes is the partner your website needs for success')}</h2>
      <p>
        {__(
          'Here you will connect the POS system to erxes'
        )}
      </p>
    </>
  );
};

const OwnerSetup = (props: Props) => {
  const { fetchConfigs } = props;

  const handleSubmit = e => {
    e.preventDefault();

    fetchConfigs();
  };

  return (
    <AuthBox>
      <h2>{__('Initial Configuration')}</h2>
      <form onSubmit={handleSubmit}>
        <Button
          btnStyle="success"
          type="submit"
          block={true}
        >
          Fetch configs
        </Button>
      </form>
    </AuthBox>
  );
};

export default OwnerSetup;
