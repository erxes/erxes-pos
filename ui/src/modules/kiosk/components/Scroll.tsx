import SimpleBar from 'simplebar-react';
import { IComponent } from 'modules/types';

const Scroll: IComponent = ({ children }) => {
  return <SimpleBar>{children}</SimpleBar>;
};

export default Scroll;
