const BaseRepository = require('./base.repo');
const RecurringTaskModel = require('../models/recurring-task.model');

module.exports = class RecurringTaskRepository extends BaseRepository {
  constructor() {
    super();
    this.logger = this.loggerInstance.createLogger({ name: 'recurring-task.repo.js__' });
  }

  model() {
    return RecurringTaskModel;
  }
};
