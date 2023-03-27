import { useState, useEffect } from 'react';
import { useApp } from 'modules/AppContext';
import { gql, useLazyQuery } from '@apollo/client';
import { queries } from '../graphql';
import { SearchComp as Search } from 'ui/Search';
import UserInCircle from 'icons/UserInCircle';
import Loading from 'ui/Loading';
import Button from 'ui/Button';

const CustomerSearch = () => {
  const {
    customerId,
    setCustomerId,
    customerType,
    setCustomerType,
    orderDetail
  } = useApp();
  const customer = (orderDetail || {}).customer || {};

  const [value, setValue] = useState(customer.primaryPhone || '');

  const [searchCustomer, { loading, data, error }] = useLazyQuery(
    gql(queries.poscCustomerDetail),
    {
      fetchPolicy: 'network-only',
      onCompleted(data) {
        const { poscCustomerDetail: detail } = data || {};
        if (detail) {
          setCustomerId(detail._id);
          setValue(detail.primaryPhone);
        }
      },
    }
  );

  const { primaryPhone, firstName, primaryEmail } =
    (data || {}).poscCustomerDetail || customer;

  const handleSearch = (val: string) =>
    val &&
    searchCustomer({
      variables: {
        _id: val,
        type: customerType
      },
    });

  const handleChange = (value: string) => {
    if (!isNaN(Number(value))) {
      setValue(value);
      setCustomerId('');
    }
  };

  const changeType = () => {
    setCustomerId('');
    if (customerType === 'company') return setCustomerType('user');
    if (customerType === 'user') return setCustomerType('');
    setCustomerType('company');
  };

  useEffect(() => {
    setValue(customer.primaryPhone || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDetail]);

  const renderResult = () => {
    if (loading) return <Loading />;

    if (error) return <small className="error">{error.message}</small>;

    if (data && !data.poscCustomerDetail)
      return <small className="error">Хэрэглэгч олдсонгүй</small>;

    if (customerId)
      return (
        <small className="success">
          {firstName && <>{firstName}</>}{' '}
          {primaryPhone && <>({primaryPhone})</>}{' '}
          {primaryEmail && <>/{primaryEmail}/</>}
        </small>
      );

    return null;
  };

  return (
    <div className="customer-search -pos">
      <div className="flex-v-center">
        <Button variant="ghost" onClick={changeType}>
          <UserInCircle type={customerType}  />
        </Button>
        <Search
          placeholder={`${
            customerType === 'company'
              ? 'Байгууллага'
              : customerType === 'user'
              ? 'Гишүүн'
              : 'Хэрэглэгч'
          } хайх`}
          onSearch={handleSearch}
          onChange={handleChange}
          value={value}
        />
        {renderResult()}
      </div>
    </div>
  );
};

export default CustomerSearch;
