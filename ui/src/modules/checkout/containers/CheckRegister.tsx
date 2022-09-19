import { useLazyQuery, gql } from '@apollo/client';
import { queries } from '../graphql';
import { useApp } from 'modules/AppContext';
import Button from 'ui/Button';

const CheckRegister = ({ setName }: any) => {
  const { registerNumber } = useApp();
  const [checkRegister, { loading }] = useLazyQuery(
    gql(queries.ordersCheckCompany),
    {
      onCompleted(data) {
        setName(data.ordersCheckCompany);
      },
    }
  );
  const disabled = registerNumber.length !== 7;

  const handleClick = () => {
    if (registerNumber.length === 7) {
      return checkRegister({
        variables: {
          registerNumber,
        },
      });
    }
  };

  return (
    <Button
      disabled={disabled}
      loading={!disabled && loading}
      onClick={handleClick}
      className="ebarimt-kiosk-check"
    >
      <h4>Шалгах</h4>
    </Button>
  );
};

export default CheckRegister;
