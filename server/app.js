const compression = require('compression');
const bodyParser = require('body-parser');
const express = require('express');
const log = require('bunyan').createLogger({ name: 'app,js__' });

const config = require('../config/config.json'); // eslint-disable-line -- To be used;
const errorHandler = require('./helper/error-handler');

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// host web app static
app.use('', express.static('../client/dist/duckduckho'));

app.disable('x-powered-by');

// error handling for api
app.use('/api', errorHandler);

app.get('/health', (req, res) => {
  res.send({
    status: 'success',
  });
});

app.use((err, req, res) => {
  log.error(err);
  res.status(500).send('Something broke:::::1');
});

module.exports = app;
