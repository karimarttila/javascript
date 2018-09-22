const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const loggerFactory = require('../util/logger');

const logger = loggerFactory();

const port = process.env.SS_PORT || 3000;


function initWebServer() {
  logger.debug('ENTER server.initWebServer');
  const myWebServer = express();
  myWebServer.use(cors());
  myWebServer.use(bodyParser.urlencoded({ extended: true }));
  myWebServer.use(bodyParser.json());
  myWebServer.use(express.static('public'));

  myWebServer.get('/info', (req, res) => {
    res.status(200).json({ info: 'index.html => Info in HTML format' });
  });


  // {:info "index.html => Info in HTML format"}

  myWebServer.get('/', (req, res) => {
    res.status(200).sendFile('index.html');
  });

  myWebServer.listen(port, () => {
    logger.debug(`listening on port ${port}`);
  });

  logger.debug('EXIT server.initWebServer');
  return myWebServer;
}

const webServer = initWebServer();

function getWebServer() {
  return webServer;
}

module.exports = getWebServer;
