import Button from 'ui/Button';
import cn from 'classnames';
import { renderType } from 'modules/utils';
import Dialog from 'ui/Dialog';
import { useState } from 'react';
import Detail from '../containers/Detail';

const DetailModal = ({
  type,
  status,
  _id,
}: {
  type: string;
  status: string;
  _id: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={() => setOpen((prev) => !prev)}
      maxWidth={768}
      trigger={
        <Button className={cn(' -tag', '-' + status)}>
          {status}-{renderType(type)}
        </Button>
      }
    >
      <h5>Захиалгийн дэлгэрэнгүй</h5>
      {open && <Detail _id={_id} />}
    </Dialog>
  );
};

export default DetailModal;
