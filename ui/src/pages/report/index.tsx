import Layout from 'modules/common/Layout';
import Header from 'modules/common/Layout/Header';
import Container from 'modules/report/containers';

const Report = () => {
  return (
    <div className="report">
      <Header />
      <Container />
    </div>
  );
};

Report.Layout = Layout;

export default Report;
