const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const HttpError = require('standard-http-error');

const BaseRepository = require('./base.repo');
const UserModel = require('../models/user.model');
const config = require('../../config/config.json');

module.exports = class UserRepo extends BaseRepository {
  constructor() {
    super();
    this.logger = this.loggerInstance.createLogger({ name: 'user.repo.js__' });
  }

  model() {
    return UserModel;
  }

  async authenticate({ email, password }) {
    const user = await this.findOne({ email });

    if (user && bcrypt.compareSync(password, user.hash)) {
      const { hash, ...userWithoutHash } = user.toObject();
      const token = jwt.sign({ sub: user.id }, config.secret);
      return {
        ...userWithoutHash,
        token,
      };
    }

    throw new HttpError(401, 'Failed to authenticate user.');
  }

  async getById(id) {
    const result = await this.findOne({ _id: id }, { hash: 0 });
    return result;
  }

  async getByEmail(email) {
    const user = await this.findOne({ email });

    if (user) {
      const { hash, ...userWithoutHash } = user.toObject();
      return {
        ...userWithoutHash,
      };
    }

    return null;
  }

  async create(_userInfo) {
    const userInfo = { ..._userInfo };

    // validate
    if (await this.findOne({ email: userInfo.email })) {
      throw new Error(`Email "${userInfo.email}" is already taken`);
    }

    // hash password
    if (userInfo.password) {
      userInfo.hash = bcrypt.hashSync(userInfo.password, 10);
      delete userInfo.password;
    }

    const user = await this.add(userInfo);

    return { _id: user._id };
  }
};
