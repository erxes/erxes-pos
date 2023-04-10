import Layout from 'modules/common/Layout';
import Header from 'modules/common/Layout/Header';
import CoverContainer from 'modules/cover/containers/create';

const Cover = () => {
  return (
    <div className="cover-wrapper">
      <Header />
      <CoverContainer />
    </div>
  );
};

Cover.Layout = Layout;

export default Cover;
