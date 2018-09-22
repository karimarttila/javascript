const simpleNodeLoggerConfig = require('simple-node-logger');

const simpleNodeLoggerOpts = {
  logFilePath: 'mylogfile.log',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
};

const logLevel = process.env.SS_LOG_LEVEL || 'debug';

function initLogger() {
  const myLogger = simpleNodeLoggerConfig.createSimpleLogger(simpleNodeLoggerOpts);
  myLogger.setLevel(logLevel);
  myLogger.info(`logger: Logger set to ${logLevel}`);
  return myLogger;
}

const logger = initLogger();

function getLogger() {
  return logger;
}

module.exports = getLogger;
