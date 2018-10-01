const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const loggerFactory = require('../util/logger');
const usersService = require('../userdb/users');

const logger = loggerFactory();

const port = process.env.SS_PORT || 4045;

/**
 * A very simple validator: just check that no item in the list is empty.
 * @param {list} myList - the list of parameters
 * @returns {boolean} - true if parameters ok, false otherwise
 */
function validateParameters(myList) {
  return !myList.some(item => ((item === null) || (item === undefined) || (item === '')));
}


// ***** Route functions start.

/**
 * Gets index page.
 * @param {object} req http request
 * @param {object} res http response
 * @returns index.html page
 */
function getIndexPage(req, res) {
  logger.debug('ENTER server.getIndexPage');
  res.status(200).sendFile('index.html');
  logger.debug('EXIT server.getIndexPage');
}


/**
 * Processes GET/info.
 * @param {object} req http request
 * @param {object} res http response
 * @returns {object} - info
 */
function getInfo(req, res) {
  logger.debug('ENTER server.getInfo');
  res.status(200).json({ info: 'index.html => Info in HTML format' });
  logger.debug('EXIT server.getInfo');
}


/**
 * Processes POST/signin.
 * Validates parameters, then calls users service to add new user.
 * @param {object} req http request
 * @param {object} res http response
 * @returns {object} - ret property true or false
 */
function postSignin(req, res) {
  logger.debug('ENTER server.postSignin');
  const myFirstName = req.body['first-name'];
  const myLastName = req.body['last-name'];
  const myEmail = req.body.email;
  const myPassword = req.body.password;
  const validationPassed = validateParameters([myFirstName, myLastName, myEmail, myPassword]);
  const responseValue = validationPassed
    ? usersService.addUser(myEmail, myFirstName, myLastName, myPassword)
    : { ret: 'failed', msg: 'Validation failed - some fields were empty' };
  const responseStatus = responseValue.ret === 'ok' ? 200 : 400;
  res.status(responseStatus).json(responseValue);
  logger.debug('EXIT server.postSignin');
}

// ***** Route functions end.


/**
 * Initializes the web server.
 * Starts listening API calls.
 * @returns {object} Web server instance
 */
function initWebServer() {
  logger.debug('ENTER server.initWebServer');
  let myWebServer = express();
  myWebServer.use(cors());
  myWebServer.use(bodyParser.urlencoded({ extended: true }));
  myWebServer.use(bodyParser.json());
  myWebServer.use(express.static('public'));

  // Routes.
  myWebServer.get('/', (req, res) => getIndexPage(req, res));
  myWebServer.get('/info', (req, res) => getInfo(req, res));
  myWebServer.post('/signin', (req, res) => postSignin(req, res));

  // Start listening.
  myWebServer = myWebServer.listen(port, () => {
    logger.debug(`listening on port ${port}`);
  });

  logger.debug('EXIT server.initWebServer');
  return myWebServer;
}


const webServer = initWebServer();


/**
 * Gets the web server instance.
 * @returns {object} Web server instance
 */
function getWebServer() {
  return webServer;
}

module.exports = getWebServer;
