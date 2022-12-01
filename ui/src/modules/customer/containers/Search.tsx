import { useState, useEffect } from 'react';
import { useApp } from 'modules/AppContext';
import { gql, useLazyQuery } from '@apollo/client';
import { queries } from '../graphql';
import { SearchComp as Search } from 'ui/Search';
import UserInCircle from 'icons/UserInCircle';
import Loading from 'modules/common/ui/Loading';

const CustomerSearch = () => {
  const { customerId, setCustomerId } = useApp();
  const [value, setValue] = useState('');

  const [searchCustomer, { loading, data, error }] = useLazyQuery(
    gql(queries.poscCustomerDetail),
    {
      fetchPolicy: 'network-only',
      onError(error) {},
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
    (data || {}).poscCustomerDetail || {};

  const handleSearch = (val: string) =>
    val &&
    searchCustomer({
      variables: {
        _id: val,
      },
    });

  const handleChange = (value: string) => {
    if (!isNaN(Number(value))) {
      setValue(value);
      setCustomerId('');
    }
  };

  useEffect(() => {
    if (customerId) {
      handleSearch(customerId);
      return;
    }
    !customerId && setValue('');
  }, [customerId]);

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
        <UserInCircle />
        <Search
          placeholder="Хэрэглэгч хайх"
          onSearch={handleSearch}
          onChange={handleChange}
          // type="number"
          value={value}
        />
        {renderResult()}
      </div>
    </div>
  );
};

export default CustomerSearch;
