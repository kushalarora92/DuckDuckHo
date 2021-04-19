const mongoose = require('mongoose');
const logger = require('bunyan').createLogger({ name: 'mongo-connection-handler.js' });

// Connect To Database
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

// On Connection
mongoose.connection.on('connected', () => {
  logger.info('Connected to database ');
});

// On Error
mongoose.connection.on('error', (err) => {
  logger.error(err);
  logger.error('Database error');
  logger.error(err.stack);
});
