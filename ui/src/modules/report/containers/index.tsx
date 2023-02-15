import { useQuery, useLazyQuery, gql } from '@apollo/client';
import { queries } from '../graphql';
import { useState } from 'react';
import dayjs from 'dayjs';
import Select from 'react-select';
import Button from 'ui/Button';
import Receipt from './Receipt';
import Loading from 'ui/Loading';
import { toast } from 'react-toastify';

const ReportContainer = () => {
  const format = (date: any) => dayjs(date).format('YYYY-MM-DD');
  const today = new Date();

  const [date, setDate] = useState(format(today));
  const [dailyReport, setDailyReport] = useState();
  const [reportUserIds, setReportUserIds] = useState([]);

  const { data, loading } = useQuery(gql(queries.posUsers), {
    onError(error) {
      toast.error(error.message);
    },
  });

  const [getReport, { loading: loadingReport }] = useLazyQuery(
    gql(queries.dailyReport),
    {
      onCompleted(data) {
        setDailyReport(data.dailyReport.report);
      },
      onError(error) {
        toast.error(error.message);
      },
      fetchPolicy: 'network-only',
    }
  );

  const handleDate = (e: any) => {
    setDate(e.target.value);
    setDailyReport(undefined);
  };

  const handleSelectUsers = (values: any) => {
    setReportUserIds(values.map((v: any) => v.value));
    setDailyReport(undefined);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    getReport({
      variables: {
        posNumber: date.replaceAll('-', ''),
        posUserIds: reportUserIds,
      },
    });
  };

  if (loading) return <Loading />;

  const { posUsers } = data || {};

  if (!posUsers) return null;

  return (
    <div className="row flex-1">
      <div className="report-inner col-4">
        <h6>Өдрийн Тайлан</h6>
        <form onSubmit={handleSubmit}>
          <b>Огноо</b>
          <input
            type="date"
            onChange={handleDate}
            value={date}
            max={format(today)}
            required
          />
          <b>Хэрэглэгч сонгох</b>
          <Select
            options={(posUsers || []).map((u: any) => ({
              value: u._id,
              label: u.email,
            }))}
            isMulti
            className="react-select"
            onChange={handleSelectUsers}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: 'gray',
                primary: 'black',
              },
            })}
          />
          <Button loading={loadingReport} type="submit">
            Report
          </Button>
        </form>
      </div>
      <div className="report-reciept flex-1">
        <Receipt date={date} report={dailyReport} />
      </div>
    </div>
  );
};

export default ReportContainer;
