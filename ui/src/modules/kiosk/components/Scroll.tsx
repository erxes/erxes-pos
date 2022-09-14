import SimpleBar from 'simplebar-react';
import { IComponent } from 'modules/types';

const Scroll: IComponent = ({ children }) => {
  return <SimpleBar forceVisible="y">{children}</SimpleBar>;
};

export default Scroll;
