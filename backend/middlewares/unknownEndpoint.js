const { ErrorHandler } = require('./errorHandler');

const unknownEndpoint = (req, res) => {
  throw new ErrorHandler(401, 'Unknown endpoint');
};

module.exports = unknownEndpoint;