import { Orders } from '../../../db/models/Orders';
import { escapeRegExp, paginate } from '../../utils/commonUtils';

interface ISearchParams {
  searchValue?: string;
  page?: number;
  perPage?: number;
}

const orderQueries = {
  orders(_root, { searchValue, page, perPage }: ISearchParams) {
    const filter: any = {};

    if (searchValue) {
      filter.number = { $regex: new RegExp(escapeRegExp(searchValue), 'i') };
    }

    return paginate(Orders.find(filter).sort('createdAt').lean(), { page, perPage });
  },
  orderDetail(_root, { _id }) {
    return Orders.findOne({ _id });
  }
};

export default orderQueries;
