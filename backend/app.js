require('dotenv').config({ path: __dirname+'/.env' });
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const routes = require('./routes');
const unknownEndpoint = require('./middlewares/unknownEndpoint');
const { ErrorHandler, handleError } = require('./middlewares/errorHandler');


const app = express();
app.set('trust proxy', true);
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(helmet());

app.use('/api', routes);
app.get('/', (req, res) => {
  res.send('<h1>Server is running</h1>');
});

app.use(unknownEndpoint);
app.use(handleError);

module.exports = app;