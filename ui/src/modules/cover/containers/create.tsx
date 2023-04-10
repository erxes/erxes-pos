import { useConfigsContext } from 'modules/auth/containers/Configs';
import { useEffect, useState } from 'react';
import Button from 'ui/Button';
import CashCover from 'modules/cover/components/CashCover';
import Other from 'modules/cover/components/Other';
import { KHANBANK_CARD, GOLOMT_CARD, TDB_CARD } from 'modules/constants';
import dayjs from 'dayjs';
import Input from 'ui/Input';
import GolomtCover from '../components/Golomt';
import TDBCover from '../components/TDB';
import { useMutation } from '@apollo/client';
import { mutations } from '../graphql';

const Cover = () => {
  const { paymentTypes, currentUser } = useConfigsContext();
  const [startDate, setStartDate] = useState(
    dayjs().format('YYYY-MM-DDTHH:mm')
  );
  const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DDTHH:mm'));
  const [details, setDetails] = useState<object[]>([]);
  const [cash, setCash] = useState({
    _id: Math.random(),
    paymentType: 'cashAmount',
    paidSummary: initial,
  });

  const [createCover, { loading }] = useMutation(mutations.coversAdd);

  const getDetail = (type: string) =>
    details.find((detail: any) => detail.paymentType === type) || {};

  const cards = [KHANBANK_CARD, TDB_CARD, GOLOMT_CARD];

  const additionalPayments = paymentTypes?.filter(
    (pt) => !cards.includes(pt.type)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCover({
      variables: {
        beginDate: startDate,
        endDate,
        status: 'new',
        userId: (currentUser || {})._id,
        details: [...details, cash],
      },
    });
  };

  const formatDate = (date: string) => dayjs(date).format('YYYY-MM-DDTHH:mm');

  const handleStartDate = (value: string) => setStartDate(formatDate(value));

  const handleEndDate = (value: any) => setEndDate(formatDate(value));

  useEffect(() => {
    const additional = (paymentTypes || []).map((payment) => ({
      _id: Math.random(),
      paymentType: payment.type,
    }));
    setDetails([
      ...additional,

      {
        _id: Math.random(),
        paymentType: 'mobileAmount',
        kind: '1',
        kindOfVal: 1,
      },
    ]);
  }, [paymentTypes]);

  return (
    <div className="flex-1 cover">
      <h6>Хаалт</h6>

      <form onSubmit={handleSubmit}>
        <div className="row choose-date">
          <div className="col-4">
            <label htmlFor="startDate">Эхлэх огноо</label>
            <Input
              type="datetime-local"
              value={startDate}
              onChange={handleStartDate}
            />
          </div>
          <div className="col-4">
            <label htmlFor="endDate">Дуусах огноо</label>
            <Input
              type="datetime-local"
              value={endDate}
              onChange={handleEndDate}
            />
          </div>
        </div>
        <CashCover cash={cash} setCash={setCash} />
        {[
          ...(additionalPayments || []),
          { type: 'mobileAmount', title: 'Цахимаар' },
        ].map((payment, idx) => (
          <Other
            payment={payment}
            key={idx}
            getDetail={getDetail}
            setDetails={setDetails}
          />
        ))}
        {paymentTypes?.find((pt) => pt.type === GOLOMT_CARD) && (
          <GolomtCover getDetail={getDetail} setDetails={setDetails} />
        )}
        {paymentTypes?.find((pt) => pt.type === TDB_CARD) && (
          <TDBCover getDetail={getDetail} setDetails={setDetails} />
        )}
        <div className="row">
          <div className="col-4">
            <Button loading={loading} type="submit" className="cover-submit">
              Хааx
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

const initial = [
  {
    kindOfVal: 10,
    value: 0,
  },
  {
    kindOfVal: 20,
    value: 0,
  },
  {
    kindOfVal: 50,
    value: 0,
  },
  {
    kindOfVal: 100,
    value: 0,
  },
  {
    kindOfVal: 500,
    value: 0,
  },
  {
    kindOfVal: 1000,
    value: 0,
  },
  {
    kindOfVal: 5000,
    value: 0,
  },
  {
    kindOfVal: 10000,
    value: 0,
  },
  {
    kindOfVal: 20000,
    value: 0,
  },
];

export default Cover;
