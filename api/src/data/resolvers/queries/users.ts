import Users from '../../../db/models/Users';
import { IContext } from '../../types';

const userQueries = {
  /**
   * Current user
   */
  currentUser(_root, _args, { user }: IContext) {
    return user
      ? Users.findOne({ _id: user._id, isActive: { $ne: false } })
      : null;
  }
};

export default userQueries;
