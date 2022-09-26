import { FC, memo } from 'react';
import ActiveOrders from 'modules/slots/containers/ActiveOrders';
import Header from 'modules/common/Layout/Header';

interface PosHeaderProps {}

const PosHeader: FC<PosHeaderProps> = ({}) => {
  return (
    <Header>
      <ActiveOrders />
    </Header>
  );
};
export default memo(PosHeader);
