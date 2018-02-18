import update from "./update-db";
import * as cron from "cron";
import startServer from "./create-server";

// run five minutes after midnight, every day ?
const cronJob:cron.CronJob = new cron.CronJob('5 0 * * *', function() {
  console.log('run five minutes after midnight, every day');
  update();
}, null, true, 'GMT+0');/* ??? */

startServer();