const logger = require('bunyan');

module.exports = class BaseController {
  constructor(req, res) {
    this.request = req;
    this.response = res;
    this.loggerInstance = logger;
  }

  // these empty methods to be overridden by respective contoller
  validate() {}

  execute() {}

  async executeAndHandleErrors() {
    try {
      const data = await this.execute();
      this.response.status(200).json(data);
    } catch (err) {
      this.errorHandler(err, this.request, this.response);
    }
  }

  errorHandler(err, req, res) {
    if (typeof (err) === 'string') {
      // custom application error
      return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
      // jwt authentication error
      return res.status(401).json({ message: 'Invalid Token' });
    }

    if (err.code === 'EBADCSRFTOKEN') {
      return res.status(403).json({ message: 'CSRF ::: Form Tampered' });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
  }
};