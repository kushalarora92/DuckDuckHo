const logger = require('bunyan');

module.exports = class BaseRepository {
  constructor() {
    this.loggerInstance = logger;
  }

  // to be overridden by model
  model() {}

  async add(data) {
    if (!data) {
      throw new Error('Invalid Form Data');
    }

    const result = await this.model().create(data);
    return result;
  }

  async findOne(predicate = {}, projection = null) {
    const result = await this.model().findOne(predicate, projection);
    return result;
  }

  async find(predicate = {}, projection = null) {
    const result = await this.model().find(predicate, projection);
    return result;
  }

  async aggregate(pipeline) {
    const result = await this.model().aggregate(pipeline);
    return result;
  }
};
