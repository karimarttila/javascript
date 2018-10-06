const webServerFactory = require('./webserver/server');
const loggerFactory = require('./util/logger');

const logger = loggerFactory();
logger.debug('ENTER core');


// Start the web server.
/* eslint-disable no-unused-vars */
const webServer = webServerFactory.getWebServer();
