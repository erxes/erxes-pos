import Layout from 'modules/common/Layout';
import Header from 'modules/common/Layout/Header';
import CoverHeader from 'modules/cover/components/header';
import Covers from 'modules/cover/containers/covers';

const Cover = () => {
  return (
    <div className="cover-wrapper">
      <Header />
      <div className="cover">
        <CoverHeader />
        <Covers />
      </div>
    </div>
  );
};

Cover.Layout = Layout;

export default Cover;
