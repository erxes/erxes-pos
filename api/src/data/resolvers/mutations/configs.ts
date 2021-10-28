import * as dotenv from 'dotenv';

import { Configs } from '../../../db/models/Configs';
import { sendRequest } from '../../utils';

dotenv.config();

const configMutations = {
  async configsFetch(_root, { token }) {
    const { ERXES_API_DOMAIN } = process.env;

    const response = await sendRequest({
      url: `${ERXES_API_DOMAIN}/pos`,
      method: 'get',
      headers: { 'POS-TOKEN': token }
    });

    console.log(response, 'rererer')

    return Configs.findOne();
  }
};

export default configMutations;
