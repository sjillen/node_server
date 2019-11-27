const { createLogger, transports, format } = require('winston');
const { simple, combine, timestamp, colorize } = format;

const logger = createLogger({
    transports: [
        new transports.File({
            filename: 'storage/app.log',
            handleExceptions: true,
            level: 'debug',
            format: combine(timestamp(), simple(), colorize()),
        }),
    ],
});

logger.stream = {
    write: function(message) {
        logger.info(message);
    },
};

module.exports = logger;
