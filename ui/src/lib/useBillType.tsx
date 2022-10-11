import { useApp } from 'modules/AppContext';
import { BILL_TYPES } from 'modules/constants';

const useBillType = () => {
  const { billType, setBillType } = useApp();
  const isOrg = billType === BILL_TYPES.ENTITY;
  const isPrsn = billType === BILL_TYPES.CITIZEN;
  const isInner = billType === BILL_TYPES.INNER;

  const chooseOrg = () => setBillType(BILL_TYPES.ENTITY);
  const choosePrsn = () => setBillType(BILL_TYPES.CITIZEN);
  const chooseInner = () => setBillType(BILL_TYPES.INNER);

  return { isOrg, isPrsn, isInner, chooseOrg, choosePrsn, chooseInner };
};

export default useBillType;
