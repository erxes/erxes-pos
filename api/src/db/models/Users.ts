import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { Model, model } from 'mongoose';
import * as sha256 from 'sha256';
import {
  IUser,
  IUserDocument,
  userSchema
} from './definitions/users';

const SALT_WORK_FACTOR = 10;

interface ILoginParams {
  email: string;
  password?: string;
  deviceToken?: string;
}

export interface IUserModel extends Model<IUserDocument> {
  getUser(_id: string): Promise<IUserDocument>;
  checkPassword(password: string): void;
  checkDuplication(params: {
    email?: string;
    idsToExclude?: string | string[];
    emails?: string[];
  }): never;
  getSecret(): string;
  generateToken(): { token: string; expires: Date };
  createUser(doc: IUser): Promise<IUserDocument>;
  createOrUpdateUser(doc: IUser): Promise<IUserDocument>;
  setUserActiveOrInactive(_id: string): Promise<IUserDocument>;
  generatePassword(password: string): Promise<string>;
  comparePassword(password: string, userPassword: string): boolean;
  createTokens(_user: IUserDocument, secret: string): string[];
  refreshTokens(
    refreshToken: string
  ): { token: string; refreshToken: string; user: IUserDocument };
  login(params: ILoginParams): { token: string; refreshToken: string };
  getTokenFields(user: IUserDocument);
}

export const loadClass = () => {
  class User {
    public static async getUser(_id: string) {
      const user = await Users.findOne({ _id });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    }

    public static checkPassword(password: string) {
      if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
        throw new Error(
          'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
        );
      }
    }

    /**
     * Checking if user has duplicated properties
     */
    public static async checkDuplication({
      email,
      idsToExclude
    }: {
      email?: string;
      idsToExclude?: string;
    }) {
      const query: { [key: string]: any } = {};
      let previousEntry;

      // Adding exclude operator to the query
      if (idsToExclude) {
        query._id = { $ne: idsToExclude };
      }

      // Checking if user has email
      if (email) {
        previousEntry = await Users.find({ ...query, email });

        // Checking if duplicated
        if (previousEntry.length > 0) {
          throw new Error('Duplicated email');
        }
      }
    }

    public static getSecret() {
      return process.env.JWT_TOKEN_SECRET || '';
    }

    /**
     * Create new user
     */
    public static async createUser({
      username,
      email,
      password,
      isOwner = false
    }: IUser) {
      // empty string password validation
      if (password === '') {
        throw new Error('Password can not be empty');
      }

      // Checking duplicated email
      await Users.checkDuplication({ email });

      this.checkPassword(password);

      return Users.create({
        isOwner,
        username,
        email,
        isActive: true,
        // hash password
        password: await this.generatePassword(password)
      });
    }

    public static async createOrUpdateUser(doc: IUser | IUserDocument) {
      // empty string password validation
      if (doc.password === '') {
        throw new Error('Password can not be empty');
      }

      // Checking duplicated email
      const query = { email: doc.email };
      const user = await Users.findOne(query);

      user && user._id ? await Users.updateOne({ _id: user._id }, doc) : await Users.create(doc);

      return Users.findOne(query);
    }

    public static async generateToken() {
      const buffer = await crypto.randomBytes(20);
      const token = buffer.toString('hex');

      return {
        token,
        expires: Date.now() + 86400000
      };
    }

    /*
     * Generates new password hash using plan text password
     */
    public static generatePassword(password: string) {
      const hashPassword = sha256(password);

      return bcrypt.hash(hashPassword, SALT_WORK_FACTOR);
    }

    /*
      Compare password
    */
    public static comparePassword(password: string, userPassword: string) {
      const hashPassword = sha256(password);

      return bcrypt.compare(hashPassword, userPassword);
    }

    public static getTokenFields(user: IUserDocument) {
      return {
        _id: user._id,
        email: user.email,
        isOwner: user.isOwner,
        username: user.username,
      };
    }

    /*
     * Creates regular and refresh tokens using given user information
     */
    public static async createTokens(_user: IUserDocument, secret: string) {
      const user = this.getTokenFields(_user);

      const createToken = await jwt.sign({ user }, secret, { expiresIn: '1d' });

      const createRefreshToken = await jwt.sign({ user }, secret, {
        expiresIn: '7d'
      });

      return [createToken, createRefreshToken];
    }

    /*
     * Renews tokens
     */
    public static async refreshTokens(refreshToken: string) {
      let _id = '';

      try {
        // validate refresh token
        const { user } = jwt.verify(refreshToken, this.getSecret());

        _id = user._id;
        // if refresh token is expired then force to login
      } catch (e) {
        return {};
      }

      const dbUser = await Users.getUser(_id);

      // recreate tokens
      const [newToken, newRefreshToken] = await this.createTokens(
        dbUser,
        this.getSecret()
      );

      return {
        token: newToken,
        refreshToken: newRefreshToken,
        user: dbUser
      };
    }

    /*
     * Validates user credentials and generates tokens
     */
    public static async login({
      email,
      password,
      deviceToken
    }: {
      email: string;
      password: string;
      deviceToken?: string;
    }) {
      email = (email || '').toLowerCase().trim();
      password = (password || '').trim();

      const user = await Users.findOne({
        $or: [
          { email: { $regex: new RegExp(`^${email}$`, 'i') } },
          { username: { $regex: new RegExp(`^${email}$`, 'i') } }
        ],
        isActive: true
      });

      if (!user || !user.password) {
        // user with provided email not found
        throw new Error('Invalid login');
      }

      const valid = await this.comparePassword(password, user.password);

      if (!valid) {
        // bad password
        throw new Error('Invalid login');
      }

      // create tokens
      const [token, refreshToken] = await this.createTokens(
        user,
        this.getSecret()
      );

      if (deviceToken) {
        const deviceTokens: string[] = user.deviceTokens || [];

        if (!deviceTokens.includes(deviceToken)) {
          deviceTokens.push(deviceToken);

          await user.update({ $set: { deviceTokens } });
        }
      }

      return {
        token,
        refreshToken
      };
    }

    public static getCodeString(code: number) {
      return ('00' + code).slice(-3);
    }
  }

  userSchema.loadClass(User);

  return userSchema;
};

loadClass();

// tslint:disable-next-line
const Users = model<IUserDocument, IUserModel>('users', userSchema);

export default Users;
