const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const logger = require('../services/logger');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./swagger.yaml');

global.Logger = logger;
const app = express();

//Middlewares
app.use(helmet());
app.use(morgan('combined', { stream: logger.stream }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
require('../routes/auth_routes')(app);
require('../routes/user_routes')(app);

module.exports = app;
