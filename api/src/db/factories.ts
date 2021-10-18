import * as faker from 'faker';
import * as Random from 'meteor-random';
import Users from './models/Users';

export const getUniqueValue = async (
  collection: any,
  fieldName: string = 'code',
  defaultValue?: string
) => {
  const getRandomValue = (type: string) =>
    type === 'email' ? faker.internet.email().toLowerCase() : Random.id();

  let uniqueValue = defaultValue || getRandomValue(fieldName);

  let duplicated = await collection.findOne({ [fieldName]: uniqueValue });

  while (duplicated) {
    uniqueValue = getRandomValue(fieldName);

    duplicated = await collection.findOne({ [fieldName]: uniqueValue });
  }

  return uniqueValue;
};

interface IUserFactoryInput {
  username?: string;
  email?: string;
  password?: string;
  isOwner?: boolean;
  isActive?: boolean;
}

export const userFactory = async (params: IUserFactoryInput = {}) => {
  const user = new Users({
    username: params.username || faker.internet.userName(),
    email: await getUniqueValue(Users, 'email', params.email),
    password:
      params.password ||
      '$2a$10$qfBFBmWmUjeRcR.nBBfgDO/BEbxgoai5qQhyjsrDUMiZC6dG7sg1q',
    isOwner: typeof params.isOwner !== 'undefined' ? params.isOwner : true,
    isActive: typeof params.isActive !== 'undefined' ? params.isActive : true
  });

  return user.save();
};
