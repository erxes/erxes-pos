import { useApp } from 'modules/AppContext';
import { BILL_TYPES } from 'modules/constants';

const useBillType = () => {
  const { billType, setBillType } = useApp();
  const isOrg = billType === BILL_TYPES.ENTITY;
  const isPrsn = billType === BILL_TYPES.CITIZEN;

  const chooseOrg = () => setBillType(BILL_TYPES.ENTITY);
  const choosePrsn = () => setBillType(BILL_TYPES.CITIZEN);

  return { isOrg, isPrsn, chooseOrg, choosePrsn };
};

export default useBillType;
