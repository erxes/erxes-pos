import useTDB from 'modules/checkout/containers/TDBCard/useTDB';
import Input from 'ui/Input';
import Button from 'ui/Button';
import { useState } from 'react';
import { handlePaymentChange, handleMap, getValueOfPayment } from '../utils';
import { toast } from 'react-toastify';

const TDBCover = ({ getDetail, setDetails }: any) => {
  const [loading, setLoading] = useState(false);
  const { endPoint, method, headers, objToString, TDB_CARD } = useTDB();
  const detail = getDetail(TDB_CARD);

  const handleCover = () => {
    setLoading(true);
    const details: any = {
      operation: 'Settlement',
      hostIndex: 0,
      ecrRefNo: 0,
    };

    fetch(endPoint, {
      method,
      headers,
      body: objToString(details),
    })
      .then((res) => res.json())
      .then((res: any) => {
        if (res && res.ecrResult && res.ecrResult.RespCode === '00') {
          setDetails((prev: any) =>
            handleMap(prev, TDB_CARD, {
              paidDetail: res.ecrResult,
            })
          );
        } else {
          toast.error(`${res.ecrResult.RespCode} - Unexpected error occured`);
        }
        setLoading(false);
      })
      .catch((e) => {
        toast.error(e.message);
        setLoading(false);
      });
  };

  const handleChange = (value: string) =>
    handlePaymentChange(value, TDB_CARD, setDetails);

  return (
    <div className="cover-templates">
      <p className="-subtitle">
        <b>Худалдаа хөгжил өдөр өндөрлөх</b>
      </p>
      <div className="row">
        <div className="col-4">
          <label htmlFor="amount">Дүн</label>
        </div>
        <div className="col-2"></div>
        <div className="col-6">
          <label htmlFor="paymentDetail">Дэлгэрэнгүй</label>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <Input onChange={handleChange} value={getValueOfPayment(detail)} />
        </div>
        <div className="col-2">
          <Button className="btn-full" onClick={handleCover} loading={loading}>
            өдөр өндөрлөх
          </Button>
        </div>
        <div className="col-6">
          <textarea
            value={detail.paidDetail ? JSON.stringify(detail.paidDetail) : ''}
          />
        </div>
      </div>
    </div>
  );
};

export default TDBCover;
