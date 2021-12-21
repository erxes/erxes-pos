import * as dotenv from 'dotenv';
import { connect } from '../db/connection';
import * as schedule from 'node-schedule';
import { Orders } from '../db/models/Orders';
import { Configs } from '../db/models/Configs';

/**
 * Send conversation messages to customer
 */
dotenv.config();

export const changeStatus = async () => {
  await connect();

  const config = await Configs.findOne();
  if (!config) {
    return;
  }

  if (!config.kitchenScreen) {
    return;
  }

  if (!config.kitchenScreen.isActive) {
    return;
  }

  if (config.kitchenScreen.type !== 'time') {
    return;
  }

  const minute = config.kitchenScreen.value;
  const checkTime = new Date((new Date()).getTime() - minute * 60 * 1000);

  await Orders.updateMany({
    status: { $in: ['new', 'paid', 'doing'] },
    modifiedAt: { $lte: checkTime }
  }, { $set: { status: 'done', modifiedAt: new Date() } })

};

/**
 * *    *    *    *    *    *
 * ┬    ┬    ┬    ┬    ┬    ┬
 * │    │    │    │    │    |
 * │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
 * │    │    │    │    └───── month (1 - 12)
 * │    │    │    └────────── day of month (1 - 31)
 * │    │    └─────────────── hour (0 - 23)
 * │    └──────────────────── minute (0 - 59)
 * └───────────────────────── second (0 - 59, OPTIONAL)
 */
schedule.scheduleJob('0 * * * * *', () => {
  changeStatus();
});
