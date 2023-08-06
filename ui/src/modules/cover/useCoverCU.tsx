import { useMutation } from '@apollo/client';
import { mutations } from './graphql';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const useCoverCU = () => {
  const router = useRouter();
  const { id } = router.query;

  const [createCover, { loading }] = useMutation(mutations.coversAdd, {
    onError(error) {
      toast.error(error.message);
    },
  });

  const [editCover, { loading: loadingEdit }] = useMutation(
    mutations.coversEdit,
    {
      onError(error) {
        toast.error(error.message);
      },
    }
  );

  const coverCU = id && id !== 'create' ? editCover : createCover;

  return { coverCU, loading: loading || loadingEdit };
};

export default useCoverCU;
