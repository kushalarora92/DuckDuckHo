const cluster = require('cluster');
const { CronJob } = require('cron');
const { spawn } = require('child_process');
const logger = require('bunyan').createLogger({ name: 'cron.js' });

if (cluster.isMaster) {
  // eslint-disable-next-line no-new
  new CronJob('00 00 */1 * * *', (() => {
    logger.info('Starting to executing cron...');
    spawn(process.execPath, ['./crons/RecurringTasksCron.js'], {
      stdio: 'inherit',
      execArgv: ['--max-old-space-size=4096'],
    });
  }), null, true, null);
}
