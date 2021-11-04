import { Configs } from '../../../db/models/Configs';

const configQueries = {
  currentConfig() {
    return Configs.findOne();
  }
};

export default configQueries;
