import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { queries } from './graphql';
import { createContext, useContext, useEffect, useState } from 'react';
import { useConfigsContext } from 'modules/auth/containers/Configs';
import Loading from 'ui/Loading';
import { formatDate } from './utils';
import dayjs from 'dayjs';

// create a context
export const CoverContext = createContext({} as any);

const CoverContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { paymentTypes } = useConfigsContext();
  const { id } = router.query;

  const [totalCash, setTotalCash] = useState(0);
  const [calcAmounts, setCalcAmounts] = useState(null);
  const [beginDate, setBeginDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string>(
    dayjs().format('YYYY-MM-DDTHH:mm')
  );
  const [details, setDetails] = useState<object[]>([]);
  const [cash, setCash] = useState({
    _id: Math.random(),
    paidType: 'cashAmount',
    paidSummary: initial,
  });
  const [description, setDescription] = useState('');

  const { loading } = useQuery(queries.coverDetail, {
    variables: { id },
    fetchPolicy: 'network-only',
    skip: !id || id === 'create',
    onCompleted({ coverDetail }) {
      const {
        beginDate,
        endDate,
        details,
        description: desc,
      } = coverDetail || {};
      setBeginDate(formatDate(beginDate));
      setEndDate(formatDate(endDate));
      const cashData =
        (details || []).find(
          (detail: any) => detail.paidType === 'cashAmount'
        ) || {};
      const cashDataSyncWithInitial = {
        ...cashData,
        paidSummary: initial.map((item) => ({
          ...item,
          value:
            (
              (cashData.paidSummary || []).find(
                (paid: any) => paid.kindOfVal === item.kindOfVal
              ) || {}
            ).value || 0,
        })),
      };
      const exceptCash = (details || []).filter(
        (detail: any) => detail.paidType !== 'cashAmount'
      );
      setCash(cashDataSyncWithInitial || initial);
      setDetails(exceptCash);
      setDescription(desc);
    },
  });

  useEffect(() => {
    if (!id || id === 'create') {
      const additional = (paymentTypes || []).map((payment) => ({
        _id: Math.random(),
        paidType: payment.type,
      }));
      setDetails([
        ...additional,
        {
          _id: Math.random(),
          paidType: 'mobileAmount',
          kind: '1',
          kindOfVal: 1,
        },
      ]);
    }
  }, [id, paymentTypes]);

  const handleStartDate = (value: string) => {
    setBeginDate(formatDate(value));
  };

  const handleEndDate = (value: any) => setEndDate(formatDate(value));

  const getDetail = (type: string) =>
    details.find((detail: any) => detail.paidType === type) || {};

  if (loading) return <Loading />;

  return (
    <CoverContext.Provider
      value={{
        beginDate,
        endDate,
        details,
        getDetail,
        setDetails,
        totalCash,
        cash,
        description,
        setCash,
        setDescription,
        handleStartDate,
        handleEndDate,
        setTotalCash,
        calcAmounts,
        setCalcAmounts,
      }}
    >
      {children}
    </CoverContext.Provider>
  );
};

export const useCoverContext = () => {
  const context = useContext(CoverContext);
  if (context === undefined) {
    throw new Error('useCoverContext must be used within a CoverContext');
  }
  return context;
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

export default CoverContextProvider;
