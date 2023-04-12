import { useConfigsContext } from 'modules/auth/containers/Configs';
import Button from 'ui/Button';
import CashCover from 'modules/cover/components/CashCover';
import Other from 'modules/cover/components/Other';
import { KHANBANK_CARD, GOLOMT_CARD, TDB_CARD } from 'modules/constants';
import GolomtCover from '../components/Golomt';
import TDBCover from '../components/TDB';
import Dates from '../components/Dates';
import { useCoverContext } from '../coverContext';
import useCoverCU from '../useCoverCU';
import { useRouter } from 'next/router';
import { queries } from '../graphql';

const Cover = () => {
  const router = useRouter();
  const { id } = router.query;
  const { cash, beginDate, endDate, details } = useCoverContext();
  const { paymentTypes, currentUser } = useConfigsContext();
  const { coverCU, loading } = useCoverCU();

  const cards = [KHANBANK_CARD, TDB_CARD, GOLOMT_CARD];

  const additionalPayments = paymentTypes?.filter(
    (pt) => !cards.includes(pt.type)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filteredCash = cash.paidSummary.filter((ps: any) => ps.value !== 0);
    coverCU({
      variables: {
        id: id,
        beginDate,
        endDate,
        status: 'new',
        userId: (currentUser || {})._id,
        details: [...details, { ...cash, paidSummary: filteredCash }],
      },
      onCompleted: () => {
        router.push('/cover');
      },
      refetchQueries: [{ query: queries.covers }, 'Covers'],
    });
  };

  return (
    <div className="flex-1 cover">
      <h6>Хаалт</h6>

      <form onSubmit={handleSubmit}>
        <Dates />
        <CashCover />
        {[
          ...(additionalPayments || []),
          { type: 'mobileAmount', title: 'Цахимаар' },
        ].map((payment, idx) => (
          <Other payment={payment} key={idx} />
        ))}
        {paymentTypes?.find((pt) => pt.type === GOLOMT_CARD) && <GolomtCover />}
        {paymentTypes?.find((pt) => pt.type === TDB_CARD) && <TDBCover />}
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

export default Cover;
