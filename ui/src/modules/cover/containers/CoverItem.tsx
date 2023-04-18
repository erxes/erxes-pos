import { useMutation } from '@apollo/client';
import { ICoverItem } from './covers';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';
import Button from 'ui/Button';
import { mutations, queries } from '../graphql';
import cn from 'classnames';
import { toast } from 'react-toastify';

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
  const [confirm, setConfirm] = useState(false);
  const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm');
  const [coversConfirm, { loading }] = useMutation(mutations.coversConfirm, {
    variables: {
      id: _id,
    },
    onCompleted() {
      setConfirm(false);
    },
    onError(error) {
      toast.error(error.message);
    },
    refetchQueries: [{ query: queries.covers }, 'covers'],
  });

  return (
    <div className="cover-item row flex-v-center">
      <div className="col-3">
        <div className="cover-item-date">
          {formatDate(beginDate)} - {formatDate(endDate)}
        </div>
        <div className={cn('cover-item-status', status)}>{status}</div>
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
        {status === 'new' && (
          <div className="flex-v-center cover-item-actions">
            {confirm ? (
              <>
                <Button onClick={() => coversConfirm()} loading={loading}>
                  Тийм
                </Button>
                <Button variant="slim" onClick={() => setConfirm(false)}>
                  Үгүй
                </Button>
              </>
            ) : (
              <>
                <Link
                  href={{
                    pathname: '/cover/[id]',
                    query: {
                      id: _id,
                    },
                  }}
                >
                  <Button variant="slim">Өөрчлөх</Button>
                </Link>
                <Button
                  className="confirm-btn"
                  onClick={() => setConfirm(true)}
                >
                  Баталгаажуулах
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoverItem;
