const winston = require('winston');
const morgan = require('morgan');
const path = require('path');
const rotator = require('logrotate-stream');

if (process.env.NODE_ENV === 'development') {
  const logDir = path.join(__dirname, '..', 'logs');

  const logFiles = {
    access: path.join(logDir, 'access.log'),
    error: path.join(logDir, 'error.log'),
    application: path.join(logDir, 'application.log'),
    email: path.join(logDir, 'email.log'),
    rateLimiter: path.join(logDir, 'rate-limit.log'),
    security: path.join(logDir, 'security.log'),
    socket: path.join(logDir, 'websocket.log'),
    sql: path.join(logDir, 'sql.log'),
    http: path.join(logDir, 'http.log'),
    mysql: path.join(logDir, 'mysql.log'),
    postman: path.join(logDir, 'postman.log'),
  };

  const commonFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  );

  const createLogger = (level, logFile) => winston.createLogger({
    level,
    format: commonFormat,
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: logFile }),
    ],
  });

  const createLogRotationStream = (logFilePath) => rotator({
    file: logFilePath,
    size: '10M',   // Rotate log after 10 MB
    keep: 5,       // Keep 5 rotated logs
    compress: true,
    encoding: 'utf-8',
    dateFormat: 'YYYY-MM-DD',
  });

  const requestLogger = morgan('combined', {
    stream: createLogRotationStream(logFiles.access),
  });

  const httpRequestLogger = morgan('combined', {
    stream: createLogRotationStream(logFiles.http),
  });

  const postmanlogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: logFiles.postman }),
    ],
  });
  const requestLog = postmanlogger.child({ category: 'request' });
  const responseLog = postmanlogger.child({ category: 'response' });

  const loggers = {
    appLogger: createLogger('info', logFiles.application),
    errorLogger: createLogger('error', logFiles.error),
    emailLogger: createLogger('info', logFiles.email),
    rateLimiterLogger: createLogger('info', logFiles.rateLimiter),
    securityLogger: createLogger('info', logFiles.security),
    socketLogger: createLogger('info', logFiles.socket),
    sqlLogger: createLogger('info', logFiles.sql),
    httpLogger: createLogger('info', logFiles.http),
    mysqlLogger: createLogger('info', logFiles.mysql),
  };

  module.exports = {
    requestLogger,
    httpRequestLogger,
    ...loggers,
    requestLog,
    responseLog,
  };
} else {
  // In production or other environments, export a placeholder or empty logger.
  const noop = () => {};

  module.exports = {
    requestLogger: noop,
    httpRequestLogger: noop,
    appLogger: { info: noop, error: noop },
    errorLogger: { info: noop, error: noop },
    emailLogger: { info: noop },
    rateLimiterLogger: { info: noop },
    securityLogger: { info: noop },
    socketLogger: { info: noop },
    sqlLogger: { info: noop },
    httpLogger: { info: noop },
    mysqlLogger: { info: noop },
    requestLog: { info: noop },
    responseLog: { info: noop },
  };
}
