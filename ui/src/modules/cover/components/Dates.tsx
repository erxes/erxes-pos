import Input from 'ui/Input';
import { useCoverContext } from '../coverContext';
import dayjs from 'dayjs';
import Button from 'modules/common/ui/Button';
import { useLazyQuery } from '@apollo/client';
import { queries } from '../graphql';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { handlePaymentChange } from '../utils';
import { toast } from 'react-toastify';

const Dates = () => {
  const {
    beginDate,
    endDate,
    handleStartDate,
    handleEndDate,
    setTotalCash,
    setDetails,
    setCalcAmounts,
  } = useCoverContext();

  const router = useRouter();

  const { id } = router.query;

  const [getCoverAmount, { loading }] = useLazyQuery(queries.coverAmounts, {
    fetchPolicy: 'network-only',

    onCompleted(data) {
      const { startDate, cashAmount, endDate, ...rest } =
        data.coverAmounts || {};

      if (id === 'create') {
        handleStartDate(startDate);
        !!cashAmount && setTotalCash(cashAmount);
        setCalcAmounts(rest);
        Object.keys(rest).map((key) =>
          handlePaymentChange(rest[key], key, setDetails)
        );
      }
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    id !== 'create' &&
      getCoverAmount({
        variables: {
          endDate,
          id,
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, router.query.id]);

  return (
    <div className="row choose-date">
      {!!beginDate && (
        <div className="col-4">
          <label htmlFor="startDate">Эхлэх огноо</label>
          <Input type="datetime-local" value={beginDate} disabled />
        </div>
      )}
      <div className="col-4 end-date">
        <label htmlFor="endDate">Дуусах огноо</label>
        <Input
          type="datetime-local"
          value={endDate}
          onChange={handleEndDate}
          max={dayjs().format('YYYY-MM-DDTHH:mm')}
        />
        <small>Хаалт хийх хугацаагаа оруулана уу</small>
      </div>
      {id === 'create' && (
        <div className="col-4">
          <label className="transparent">hi</label>
          <Button
            onClick={() =>
              getCoverAmount({
                variables: {
                  endDate,
                },
              })
            }
            type="button"
            loading={loading}
          >
            Хаалтын дүн татах
          </Button>
        </div>
      )}
    </div>
  );
};

export default Dates;
