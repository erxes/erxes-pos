import { useQuery } from '@apollo/client';
import { queries } from '../graphql';
import Loading from 'ui/Loading';
import CoverItem from './CoverItem';

export interface ICoverItem {
  _id: string;
  beginDate: string;
  endDate: string;
  createdAt: string;
  createdUser: {
    email: string;
    username?: string;
  };
  modifiedUser: {
    email: string;
    username?: string;
  };
  modifiedAt?: string;
}

const Covers = () => {
  const { data, loading } = useQuery(queries.covers);
  
  if (loading) return <Loading />;

  const { covers } = data || {};
  return (
    <div className="covers">
      <div className="row">
        <div className="col-3">
          <label>Огноо /эхлэx - дуусах/</label>
        </div>
        <div className="col-3">
          <label>Хаалт үүсгэсэн /огноо - хүн/</label>
        </div>
        <div className="col-3">
          <label>Хаалт өөрчилсөн /огноо - хүн/</label>
        </div>
        <div className="col-3 cover-item-actions-label">
          <label>Үйлдэл</label>
        </div>
      </div>
      {(covers || []).map((cover: ICoverItem) => (
        <CoverItem key={cover._id} {...cover} />
      ))}
    </div>
  );
};

export default Covers;
