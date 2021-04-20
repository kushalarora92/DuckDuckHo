const Joi = require('joi');
const HttpError = require('standard-http-error');

const BaseController = require('./base.controller');
const FeedDetailsRepository = require('../repositories/feed-details.repo');

module.exports = class AddFeedDetailsController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.logger = this.loggerInstance.createLogger({ name: 'add-feed-details.controller.js__' });
    this.feedDetailsRepository = new FeedDetailsRepository();
  }

  async validate() {
    const { authenticatedUser } = this.request;
    if (!authenticatedUser || !authenticatedUser.active) {
      throw new HttpError(401, 'Invalid User');
    }

    const joiValidationFeedDetailsSchema = Joi.object({
      fedAt: Joi.date().required(),
      foodItems: Joi.array().items(Joi.string().required()).required(),
      ducksQty: Joi.number().min(1).required(),
      totalFoodUsed: Joi.number().min(1).required(),
      address: Joi.object({
        addressLine1: Joi.string().required(),
        addressLine2: Joi.string().required(),
        landmark: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        pincode: Joi.number().required(),
      }).required(),
    });

    const { error } = joiValidationFeedDetailsSchema.validate(this.request.body);
    if (error) {
      throw new Error(error.message);
    }
  }

  async execute() {
    await this.validate();

    const { body, authenticatedUser } = this.request;
    const updates = { userId: authenticatedUser._id, ...body };
    const data = await this.feedDetailsRepository.add(updates);
    return data;
  }
};
