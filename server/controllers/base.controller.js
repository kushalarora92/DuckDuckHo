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
      const code = 200;
      const response = { data, code };
      this.response.status(code).json(response);
    } catch (err) {
      this.errorHandler(err, this.request, this.response);
    }
  }

  errorHandler(err, req, res) {
    if (typeof (err) === 'string') {
      // custom application error
      return res.status(400).json({ code: 400, message: err });
    }

    if (err.name === 'UnauthorizedError') {
      // jwt authentication error
      return res.status(401).json({ code: 401, message: 'Invalid Token' });
    }

    if (err.code === 'EBADCSRFTOKEN') {
      return res.status(403).json({ code: 403, message: 'CSRF ::: Form Tampered' });
    }

    return res.status(err.status || 500).json({ code: err.status || 500, message: err.message });
  }
};
