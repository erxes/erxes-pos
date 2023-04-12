import Layout from 'modules/common/Layout';
import Header from 'modules/common/Layout/Header';
import CoverContainer from 'modules/cover/containers/createOrEdit';
import CoverContextProvider from 'modules/cover/coverContext';

const Cover = () => {
  return (
    <div className="cover-wrapper">
      <Header />
      <CoverContextProvider>
        <CoverContainer />
      </CoverContextProvider>
    </div>
  );
};

Cover.Layout = Layout;

export default Cover;
