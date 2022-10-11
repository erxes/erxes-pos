import { useApp } from 'modules/AppContext';
import { toast } from 'react-toastify';
import { ORDER_ITEM_STATUSES } from '../modules/constants';

const useIsEditable = () => {
  const { orderDetail } = useApp();
  const { paidDate } = orderDetail || {};

  const warning = () => {
    toast.dismiss();
    toast.warning('Төлбөр төлөгдсөн байна');
  };

  const checkStatus = (status: string) => status === ORDER_ITEM_STATUSES.DONE;

  return { paidDate, warning, checkStatus };
};

export default useIsEditable;
