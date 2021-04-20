const compression = require('compression');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // trace every request hit
const logger = require('bunyan').createLogger({ name: 'app,js__' }); // eslint-disable-line

const config = require('../config/config.json'); // eslint-disable-line -- To be used;
const jwt = require('./helper/jwt');
const errorHandler = require('./helper/error-handler');

const app = express();

app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// connect mongo
require('./helper/mongo-connection-handler');

app.disable('x-powered-by');

app.get('/health', (req, res) => {
  res.send({ status: 'success' });
});

app.use('/api', jwt(), require('./routes'));

app.use(errorHandler);

app.use('', express.static('public/duckduckho')); // host web app static

module.exports = app;
