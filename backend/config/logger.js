const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

// Define the format for log messages
const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(
        ({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`,
    ),
);

// Create the logger instance
const logger = createLogger({
    level: 'info', // Set the default log level
    format: logFormat,
    transports: [
        // Log to the console
        new transports.Console(),

        // Log to daily rotating file
        new transports.DailyRotateFile({
            filename: 'logs/app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxFiles: '7d', // Keep logs for 7 days
        }),
    ],
});

// Export the logger instance
module.exports = logger;
