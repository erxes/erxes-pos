import { gql, useQuery } from '@apollo/client';
import { queries } from 'modules/checkout/graphql';
import LoadingDots from 'ui/Loading';

const Detail = ({ _id }: { _id: string }) => {
  const { data, loading } = useQuery(gql(queries.orderDetail), {
    variables: {
      _id,
    },
  });
  if (loading)
    return (
      <div className="">
        <LoadingDots />
      </div>
    );

  const { orderDetail } = data || {};

  const { customer, deliveryInfo, dueDate } = orderDetail || {};

  const { firstName, lastName, primaryEmail, primaryPhone } = customer || {};

  const { address, description, marker } = deliveryInfo || {};

  const userInfo = {
    firstName,
    lastName,
    primaryEmail,
    primaryPhone,
  };
  return (
    <div className="kitchen-detail">
      <big className="-title">Хэрэглэгчийн мэдээлэл</big>
      {Object.keys(userInfo).map((key) => (
        <div className="flex-v-center -desc" key={key}>
          <span className="-label">{key}:</span>
          <b>{userInfo[key as keyof typeof userInfo] || '-'}</b>
        </div>
      ))}
      <big className="-title">Хаягийн мэдээлэл</big>
      <div className="-desc">
        <span className="-label">Due date:</span>
        <b>{dueDate || '-'}</b>
      </div>
      {Object.keys(address).map((key) => (
        <div className="flex-v-center -desc" key={key}>
          <span className="-label">{key}:</span>
          <b>{address[key as keyof typeof userInfo] || '-'}</b>
        </div>
      ))}
      <div className="-desc">
        <span className="-label">description:</span>
        <b>{description || '-'}</b>
      </div>
      <div className="-desc">
        <span className="-label">marker:</span>
        <b>{JSON.stringify(marker) || '-'}</b>
      </div>
    </div>
  );
};

export default Detail;
