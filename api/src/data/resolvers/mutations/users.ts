import * as express from 'express';
import Users from '../../../db/models/Users';
import { IUser } from '../../../db/models/definitions/users';
import { IContext } from '../../types';
import { authCookieOptions } from '../../utils/commonUtils';

interface ILogin {
  email: string;
  password: string;
  deviceToken?: string;
}

const login = async (args: ILogin, res: express.Response, secure: boolean) => {
  const response = await Users.login(args);

  const { token } = response;

  res.cookie('pos-auth-token', token, authCookieOptions(secure));

  return 'loggedIn';
};

const userMutations = {
  async usersCreateOwner(
    _root,
    {
      email,
      password,
    }: {
      email: string;
      password: string;
      firstName: string;
      purpose: string;
      lastName?: string;
      subscribeEmail?: boolean;
    }
  ) {
    const userCount = await Users.countDocuments();

    if (userCount > 0) {
      throw new Error('Access denied');
    }

    const doc: IUser = {
      isOwner: true,
      email: (email || '').toLowerCase().trim(),
      password: (password || '').trim(),
    };

    await Users.createUser(doc);

    return 'success';
  },
  /*
   * Login
   */
  async login(_root, args: ILogin, { res, requestInfo }: IContext) {
    return login(args, res, requestInfo.secure);
  },

  async logout(_root, _args, { res }) {
    res.clearCookie('pos-auth-token');
    return 'loggedout';
  }
};

export default userMutations;
