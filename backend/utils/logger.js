const pino = require('pino');

// create logger instance via pino using simplest methods
const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: true,
      ignore: 'pid,hostname',
    },
  },
});


module.exports = logger ;