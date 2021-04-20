const Joi = require('joi');

const BaseController = require('./base.controller');
const UserRepository = require('../repositories/user.repo');

module.exports = class LoginUserController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.logger = this.loggerInstance.createLogger({ name: 'login-user.controller.js__' });
    this.userRepo = new UserRepository();
  }

  async validate() {
    const joiValidationUserSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = joiValidationUserSchema.validate(this.request.body);
    if (error) {
      throw new Error(error.message);
    }
  }

  async execute() {
    await this.validate();

    const { body } = this.request;
    const data = await this.userRepo.authenticate(body);
    return data;
  }
};
