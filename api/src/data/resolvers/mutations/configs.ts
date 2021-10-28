import * as dotenv from 'dotenv';

import { Configs } from '../../../db/models/Configs';
import { sendRequest } from '../../utils';

dotenv.config();

const configMutations = {
  async configsFetch() {
    const { ERXES_API_DOMAIN, POS_TOKEN = '' } = process.env;

    const response = await sendRequest({
      url: `${ERXES_API_DOMAIN}/pos`,
      method: 'get',
      headers: { 'POS-TOKEN': POS_TOKEN }
    });

    console.log(response, 'rererer')

    return Configs.findOne();
  }
};

export default configMutations;
