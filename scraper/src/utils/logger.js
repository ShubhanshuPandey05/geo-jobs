const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
      return `${timestamp} [${level.toUpperCase().padEnd(5)}] ${message}${metaStr}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/scraper-error.log',
      level: 'error',
      maxsize: 5242880,
      maxFiles: 3,
    }),
    new winston.transports.File({
      filename: 'logs/scraper.log',
      maxsize: 10485760,
      maxFiles: 5,
    }),
  ],
});

module.exports = logger;
