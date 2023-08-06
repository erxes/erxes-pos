import { useMutation, ApolloError } from '@apollo/client';
import { ICoverItem } from './covers';
import dayjs from 'dayjs';
// import Link from 'next/link';
import { useState } from 'react';
import Button from 'ui/Button';
import { mutations, queries } from '../graphql';
import c from 'classnames';
import { toast } from 'react-toastify';
import Link from 'next/link';

const CoverItem = ({
  _id,
  beginDate,
  endDate,
  createdUser,
  createdAt,
  modifiedUser,
  modifiedAt,
  status,
}: ICoverItem) => {
  const [action, setAction] = useState('');
  const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm');
  
  const options = {
    variables: {
      id: _id,
    },
    onCompleted() {
      setAction('');
    },
    onError(error: ApolloError) {
      toast.error(error.message);
    },
    refetchQueries: [{ query: queries.covers }, 'covers'],
  };

  const [coversConfirm, { loading }] = useMutation(
    mutations.coversConfirm,
    options
  );
  const [coversDelete, { loading: loadingDelete }] = useMutation(
    mutations.coversDelete,
    options
  );

  const renderActions = () => {
    if (status === 'confirm') return null;

    if (!!action)
      return (
        <>
          <Button
            onClick={() =>
              action === 'delete' ? coversDelete() : coversConfirm()
            }
            className={action === 'delete' ? 'cover-item-delete' : ''}
            loading={loading || loadingDelete}
          >
            Тийм
          </Button>
          <Button variant="slim" onClick={() => setAction('')}>
            Үгүй
          </Button>
        </>
      );
    return (
      <>
        <Button
          className="cover-item-delete"
          onClick={() => setAction('delete')}
        >
          Устгах
        </Button>

        <Link
          href={{
            pathname: '/cover/[id]',
            query: {
              id: _id,
            },
          }}
        >
          <a className="btn slim">Өөрчлөх</a>
        </Link>
        <Button className="confirm-btn" onClick={() => setAction('confirm')}>
          Баталгаажуулах
        </Button>
      </>
    );
  };

  return (
    <div className="cover-item row flex-v-center">
      <div className="col-3">
        <div className="cover-item-date">
          {formatDate(beginDate)} - {formatDate(endDate)}
        </div>
        <div className={c('cover-item-status', status)}>{status}</div>
      </div>
      <div className="col-3">
        <p className="cover-item-date">{formatDate(createdAt)}</p>
        {createdUser.username || createdUser.email}
      </div>
      <div className="col-3">
        {modifiedAt && (
          <>
            <p className="cover-item-date">
              {modifiedAt ? formatDate(modifiedAt) : '-'}
            </p>
            {modifiedUser ? modifiedUser.username || modifiedUser.email : '-'}
          </>
        )}
      </div>
      <div className="col-3">
        <div className="flex-v-center cover-item-actions">
          {renderActions()}
        </div>
      </div>
    </div>
  );
};

export default CoverItem;
