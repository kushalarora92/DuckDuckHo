const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../config/.env') });
const mongoose = require('mongoose');
const logger = require('bunyan').createLogger({ name: 'RecurringTasksCron.js__' });

const RecurringTaskRepository = require('../repositories/recurring-task.repo');
const UserRepository = require('../repositories/user.repo');
const FeedDetailsRepository = require('../repositories/feed-details.repo');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.kDatabasePath, {
  user: process.env.kDatabaseUserName,
  pass: process.env.kDatabasePassword,
  dbName: process.env.kDatabaseName,
  keepAlive: true,
  useNewUrlParser: true,
  authMechanism: 'SCRAM-SHA-1',
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// On Error
mongoose.connection.on('error', (err) => {
  logger.error(err);
  logger.error('Database error');
  logger.error(err.stack);
});

// On Connection
mongoose.connection.on('connected', async () => {
  logger.info('Connected to database for RecurringTasksCron');
  const startTime = new Date();

  try {
    const startHour = startTime.getUTCHours() - 1;
    const endHour = startTime.getUTCHours();
    const recurringTaskRepo = new RecurringTaskRepository();
    const feedDetailsRepo = new FeedDetailsRepository();

    logger.info(`Starting to execute CRON for >=${startHour} and <${endHour}`);

    const recurringTasks = await recurringTaskRepo.aggregate([
      {
        $match: { active: true },
      }, {
        $redact: {
          $cond: {
            if: {
              $and: [
                { $gte: [{ $hour: '$recurrAt' }, startHour] },
                { $lt: [{ $hour: '$recurrAt' }, endHour] },
              ],
            },
            then: '$$KEEP',
            else: '$$PRUNE',
          },
        },
      }, {
        $lookup: {
          from: 'feeddetails',
          localField: 'feedId',
          foreignField: '_id',
          as: 'feedDetails',
        },
      }, {
        $unwind: {
          path: '$feedDetails',
          preserveNullAndEmptyArrays: false,
        },
      },
    ]);

    if (!recurringTasks.length) {
      logger.info('No recurring tasks available for the interval. Exiting.');
      return;
    }

    logger.info(`Found ${recurringTasks.length} tasks for the interval. Executing...`);

    await Promise.all(recurringTasks.map((task) => {
      if (!task || !task.feedDetails) {
        logger.error(`No feedDetails found for task ${task._id}`);
        return null;
      }

      const newFedAt = new Date(task.fedAt);
      newFedAt.setDate(startTime.getUTCDate());
      const feedDetails = { ...task.feedDetails, ...{ fetAd: newFedAt } };
      delete feedDetails._id;

      return feedDetailsRepo.add(feedDetails);
    }));

    logger.info(`${startTime}}: Feed Details via CRON added Successfully.`);
    await mongoose.disconnect();
  } catch (e) {
    logger.error(`Error Ocucured in executing CRON - ${e.message}`);
  } finally {
    logger.info(`Time take to execute cron - ${Date.now() - startTime.getTime()}`);
  }
});
