/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { mutations } from 'modules/checkout/graphql';
import { ORDER_STATUSES } from 'modules/constants';
import OrderItem from '../containers/OrderItem';
import Timer from './Timer';
import Button from 'ui/Button';
import { goToKitchenReceipt, renderType } from 'modules/utils';

const Order = ({
  number,
  type,
  items,
  modifiedAt,
  paidDate,
  _id,
  status,
}: any) => {
  const { DONE, NEW, DOING } = ORDER_STATUSES;
  const [doneItems, setDoneItems] = useState([]);
  const [orderChangeStatus, { loading }] = useMutation(
    gql(mutations.orderChangeStatus)
  );

  const handleChangeStatus = (status: string) =>
    orderChangeStatus({
      variables: { _id, status },
      onCompleted() {
        if (status === DONE) {
          setDoneItems(items.map((item: any) => item._id));
          goToKitchenReceipt(_id);
        }
      },
    });

  useEffect(() => {
    setDoneItems(
      items
        .filter(({ status }: any) => status === DONE)
        .map(({ _id }: any) => _id)
    );
  }, []);

  useEffect(() => {
    if (status === NEW && doneItems.length > 0) {
      handleChangeStatus(DOING);
    }
    if (items.length === doneItems.length) {
      handleChangeStatus(DONE);
    }
  }, [doneItems]);

  return (
    <div className="kitchen-order">
      <div className="-header">
        <div className="flex-h-between">
          <h5>#{number.split('_')[1]}</h5>
          <div className="flex-v-center">
            <div className="flex-center flex-col">
              <p className="btn flat -tag">{renderType(type)}</p>
              <Timer modifiedAt={modifiedAt} paidDate={paidDate} />
            </div>
            <Button
              variant="slim"
              loading={loading}
              onClick={() => handleChangeStatus(DONE)}
            >
              Бэлэн болсон
            </Button>
          </div>
        </div>
      </div>
      {items.map((item: any) => (
        <OrderItem
          key={item._id}
          {...item}
          orderStatus={status}
          doneItems={doneItems}
          handleChangeStatus={handleChangeStatus}
          setDoneItems={setDoneItems}
        />
      ))}
    </div>
  );
};

export default Order;
