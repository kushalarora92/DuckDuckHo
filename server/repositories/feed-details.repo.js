const BaseRepository = require('./base.repo');
const FeedDetailsModel = require('../models/feed-details.model');

module.exports = class FeedDetailsRepository extends BaseRepository {
  constructor() {
    super();
    this.logger = this.loggerInstance.createLogger({ name: 'feed-details.repo.js__' });
  }

  model() {
    return FeedDetailsModel;
  }
};
