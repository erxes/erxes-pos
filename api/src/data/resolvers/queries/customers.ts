import Customers from '../../../db/models/Customers';

interface IListArgs {
  searchValue?: string;
}

const customerQueries = {
  // use it for customer search by email, name & code only
  async customers(_root, { searchValue }: IListArgs) {
    const filter: any = {};

    if (searchValue) {
      const regex = new RegExp(`${searchValue}`, "i");

      filter.$or = [
        { primaryEmail: regex },
        { firstName: regex },
        { code: regex }
      ];
    }

    return Customers.find(filter).limit(10).lean();
  },

  customerDetail(_root, { _id }: { _id: string }) {
    return Customers.findOne({ _id });
  }
};

export default customerQueries;
