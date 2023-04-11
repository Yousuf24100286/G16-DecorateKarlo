require('dotenv').config();
const http = require('http');
const app = require('./app');
const logger = require('./utils/logger');
const server = http.createServer(app);
const port = process.env.PORT || 5000;

server.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
