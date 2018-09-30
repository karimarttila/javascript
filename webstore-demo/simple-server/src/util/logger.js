const simpleNodeLoggerConfig = require('simple-node-logger');

const simpleNodeLoggerOpts = {
  logFilePath: 'mylogfile.log',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
};

const logLevel = process.env.SS_LOG_LEVEL || 'debug';

// Initializes logger. Internal function and therefore no generated doc.
function initLogger() {
  const myLogger = simpleNodeLoggerConfig.createSimpleLogger(simpleNodeLoggerOpts);
  myLogger.setLevel(logLevel);
  myLogger.info(`logger: Logger set to ${logLevel}`);
  return myLogger;
}

const logger = initLogger();


/**
 * Gets the logger instance.
 * @returns {object} Logger instance
 */
function getLogger() {
  return logger;
}

module.exports = getLogger;
