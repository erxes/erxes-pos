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

  if (!config.waitingScreen) {
    return;
  }

  if (!config.waitingScreen.isActive) {
    return;
  }

  if (config.waitingScreen.type !== 'time') {
    return;
  }

  const minute = config.waitingScreen.value;
  const checkTime = new Date((new Date()).getTime() - minute * 60 * 1000);

  await Orders.updateMany({
    status: { $in: ['done'] },
    modifiedAt: { $lte: checkTime }
  }, { $set: { status: 'complete', modifiedAt: new Date() } })

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
schedule.scheduleJob('40 * * * * *', () => {
  changeStatus();
});
