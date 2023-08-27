import { useApp } from 'modules/AppContext';
import HistoryItem from './item';
import { formatNum } from '../../utils';
import { toast } from 'react-toastify';
import Button from 'ui/Button';
import { useEffect, useState } from 'react';
import Input from 'ui/Input';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import { BANK_CARDS } from 'modules/constants';
import { gql, useMutation } from '@apollo/client';
import { mutations, queries } from 'modules/checkout/graphql';

const Detail = () => {
  const { orderDetail } = useApp();
  const { items, _id } = orderDetail;

  const [showReturn, setShowReturn] = useState(false);
  const [cashAmount, setCashAmount] = useState(orderDetail.totalAmount);
  const [paidAmounts, setPaidAmounts] = useState({} as { [type: string]: number });
  const [diffAmount, setDiffAmount] = useState(0);

  useEffect(() => {
    const total = (Object.values({
      ...paidAmounts
    }) || []).reduce((sum, cur) => sum + Number(cur), 0);

    setDiffAmount(orderDetail.totalAmount - total - cashAmount)
  }, [paidAmounts, cashAmount, orderDetail]);

  const onChangePaid = (type: string, value: string) => {
    const numVal = Number(value.replace(/ /g, ''));
    const newPaidAmounts = { ...paidAmounts, [type]: numVal };
    setPaidAmounts(newPaidAmounts);

    const total = (Object.values({
      ...newPaidAmounts
    }) || []).reduce((sum, cur) => sum + Number(cur), 0);
    const diff = orderDetail.totalAmount - total
    if (diff > 0) {
      setCashAmount(diff)
    } else {
      setCashAmount(0)
    }
  }

  const [ordersReturn, { loading: loadingReturn }] = useMutation(
    gql(mutations.ordersReturn),
    {
      variables: {
        _id: orderDetail._id,
        cashAmount,
        paidAmounts: Object.keys(paidAmounts)
          .filter(type => paidAmounts[type])
          .map(type => ({ type, amount: paidAmounts[type] }))
      },
      onCompleted(data) {
        const { _id } = (data || {}).ordersReturn || {};
        toast.success('Амжилттай буцаалаа.');
        return;
      },
      refetchQueries: [{ query: gql(queries.orderDetail) }, 'orderDetail'],
      onError(error) {
        toast.error(error.message);
      },
    }
  );

  const renderReturnForm = () => {
    if (!showReturn) {
      return <></>;
    }

    const { paymentTypes } = useConfigsContext();

    return (
      <div>
        <div className="row">
          <div className="col-4">
            Бэлнээр:
          </div>
          <div className="col-8">
            <Input
              value={formatNum(cashAmount)}
              onChange={(value) => { setCashAmount(Number(value.replace(/ /g, ''))); console.log(value) }}
            />

          </div>
          {(paymentTypes || [])
            .filter((pt) => !BANK_CARDS.includes(pt.type))
            .map((payment) => (
              <>
                <div className="col-4">
                  {payment.title}:
                </div>
                <div className="col-8">
                  <Input
                    value={formatNum(paidAmounts[payment.type])}
                    onChange={value => onChangePaid(payment.type, value)}
                  // disabled={disabled}
                  />

                </div>
              </>
            ))}
        </div>
        <p>
          Зөрүү: {diffAmount}
        </p>

        <Button
          className=""
          disabled={!orderDetail.paidDate}
          onClick={() => setShowReturn(false)}
          loading={false}
        >
          Болих
        </Button>

        <Button
          className=""
          disabled={!orderDetail.paidDate || diffAmount !== 0}
          onClick={() => ordersReturn()}
          loading={loadingReturn}
        >
          Буцаалт хадгалах
        </Button>
      </div>
    )
  }

  return (
    <div className="history-detail">
      <HistoryItem order={orderDetail} />
      <div className="history-detail-items">
        {items.map((item: any) => (
          <div className=" -item" key={item._id}>
            <b className="-name">{item.productName}</b>
            <div className="flex-h-between">
              <p>
                {item.unitPrice}₮ x {item.count}ш
              </p>
              <h6>
                <b>{formatNum(item.unitPrice * item.count)}₮ </b>
              </h6>
            </div>
          </div>
        ))}
      </div>

      {orderDetail.status !== 'return' && (
        <div className="row">
          <div className="col-6">
            <a
              href={`/order-receipt/${_id}`}
              target="_blank"
              rel="noreferrer"
              className="btn slim"
            >
              Хэвлэх
            </a>
          </div>
          <div className="col-6">
            <Button
              className="btn slim"
              disabled={!orderDetail.paidDate}
              onClick={() => setShowReturn(true)}
              loading={false}
            >
              БУЦААЛТ
            </Button>
          </div>
        </div>
      )}

      {renderReturnForm()}
    </div>
  );
};

export default Detail;
