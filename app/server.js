const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const logger = require('../services/logger');

global.Logger = logger;
const app = express();

//Middlewares
app.use(helmet());
app.use(morgan('combined', { stream: logger.stream }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

// Routes
require('../routes/user_routes')(app);

module.exports = app;
