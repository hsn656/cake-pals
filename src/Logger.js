const winston = require('winston');
const correlation = require('express-correlation-id');

class LoggerUtils {
  static instance;

  getLogger() {
    return winston.createLogger({
      level: 'info',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format((info) => {
              info.correlationId = correlation.getId() || '';
              return info;
            })(),
            winston.format.errors({ stack: true }),
            winston.format.timestamp(),
            winston.format.splat(),
            winston.format.printf(this.logTransform),
          )
        }),
      ],
      exitOnError: false,
    });
  }

  static getInstance() {
    if (!LoggerUtils.instance) {
      const loggerUtils = new LoggerUtils();
      LoggerUtils.instance = loggerUtils.getLogger();
    }

    return LoggerUtils.instance;
  }

  logTransform = (info) => {
    const { level, message, timestamp, correlationId } = info;
    return `${timestamp} -${correlationId}- ${level}: ${message}`;
  };
}

const logger = LoggerUtils.getInstance();

module.exports = {
  logger,
  Logger: winston.Logger
}
