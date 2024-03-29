import useGolomt from 'modules/checkout/containers/golomtCard/useGolomt';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from 'ui/Button';
import { base64ToObj } from 'modules/utils';
import Input from 'ui/Input';
import { handlePaymentChange, handleMap, getValueOfPayment } from '../utils';
import { useCoverContext } from '../coverContext';

const GolomtCover = () => {
  const { getDetail, setDetails } = useCoverContext();

  const { endPoint, sendData, GOLOMT_CARD } = useGolomt();
  const [loading, setLoading] = useState(false);
  const detail = getDetail(GOLOMT_CARD);

  const handleCover = () => {
    setLoading(true);
    fetch(
      endPoint({
        ...sendData,
        operationCode: '59',
      })
    )
      .then((res) => res.json())
      .then((r) => {
        const posResult = JSON.parse(r?.PosResult);
        if (posResult?.responseCode === '00') {
          const receiptData = base64ToObj(posResult?.data);

          setDetails((prev: any) =>
            handleMap(prev, GOLOMT_CARD, {
              paidDetail: receiptData,
            })
          );
        } else {
          toast.error(posResult.responseDesc);
        }
        setLoading(false);
      })
      .catch((e) => {
        toast.error(e.message);
        setLoading(false);
      });
  };

  const handleChange = (value: string) =>
    handlePaymentChange(value, GOLOMT_CARD, setDetails);

  return (
    <div className="cover-templates">
      <p className="-subtitle">
        <b>Голомт өдөр өндөрлөх</b>
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
          <Input
            value={getValueOfPayment(detail)}
            onChange={handleChange}
            type="number"
          />
        </div>
        <div className="col-2">
          <Button className="btn-full" onClick={handleCover} loading={loading}>
            өдөр өндөрлөх
          </Button>
        </div>
        <div className="col-6">
          <textarea
            value={detail.paidDetail ? JSON.stringify(detail.paidDetail) : ''}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default GolomtCover;
