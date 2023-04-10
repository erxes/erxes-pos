import { useQuery } from '@apollo/client';
import { queries } from '../graphql';
import Loading from 'ui/Loading';

const Covers = () => {
  const { data, loading } = useQuery(queries.covers);
  if (loading) return <Loading />;
  return <div>Enter</div>;
};

export default Covers;
