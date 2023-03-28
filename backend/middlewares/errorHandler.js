const logger = require('../utils/logger');


class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }

  static badRequest(message) {
    return new ErrorHandler(400, message);
  }

}


const handleError = (err, req, res, next) => {
  console.log('---------------------------------------')
  console.log(err.statusCode);
  console.log(err.message);
  console.log(req.originalUrl);
  console.log(req.method);
  console.log(req.ip);
  console.log('---------------------------------------')
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
  logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  next();
};

module.exports = {
  ErrorHandler,
  handleError,
};