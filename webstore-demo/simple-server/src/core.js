const webServerFactory = require('./webserver/server');
const loggerFactory = require('./util/logger');

const logger = loggerFactory();
logger.debug('ENTER core');

// We just start the web server in core.
/* eslint-disable no-unused-vars */
const webServer = webServerFactory();
