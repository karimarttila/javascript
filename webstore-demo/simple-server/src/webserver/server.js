const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const atob = require('atob');
const loggerFactory = require('../util/logger');
const usersService = require('../userdb/users');
const sessionService = require('./session');
const prop = require('../util/prop');
const domain = require('../domaindb/domain');

const logger = loggerFactory();

const propPort = prop.getIntValue('port');
const port = process.env.SS_PORT || propPort;


/**
 * A very simple validator: just check that no item in the list is empty.
 * @param {list} myList - the list of parameters
 * @returns {boolean} - true if parameters ok, false otherwise
 */
function validateParameters(myList) {
  return !myList.some(item => ((item === null) || (item === undefined) || (item === '')));
}


/**
 * Validates the Json web token in authorization header parameter.
 * @param {string} auth - authorization header parameter
 * @returns {object} object {:email :exp} if success, null otherwise
 */
function isValidToken(auth) {
  logger.debug('ENTER server.isValidToken, auth: ', auth);
  let ret;
  if (auth === undefined) {
    logger.warn('Authorization not found in the header parameters');
    ret = null;
  }
  else {
    const len = auth.length;
    const rest = auth.substring(5, len);
    const encoded = atob(rest);
    logger.trace('encoded: ', encoded);
    const index = encoded.indexOf(':NOT');
    const token = encoded.substring(0, index);
    logger.trace('token: ', token);
    ret = sessionService.validateJsonWebToken(token);
  }
  logger.debug('EXIT server.isValidToken');
  return ret;
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
 * @returns {object} - ret property 'ok' or 'failed'
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


/**
 * Processes POST/login.
 * Validates parameters, checks credentials, and if credentials ok
 * then creates JSON web token.
 * @param {object} req http request
 * @param {object} res http response
 * @returns {object} - ret property 'ok' or 'failed'
 */
function postLogin(req, res) {
  logger.debug('ENTER server.postLogin');
  const myEmail = req.body.email;
  const myPassword = req.body.password;
  logger.trace(`myEmail: ${myEmail}`);
  logger.trace(`myPassword: ${myPassword}`);
  const validationPassed = validateParameters([myEmail, myPassword]);
  let responseValue = null;
  if (!validationPassed) {
    responseValue = { ret: 'failed', msg: 'Validation failed - some fields were empty' };
  }
  else {
    const credentialsOk = usersService.checkCredentials(myEmail, myPassword);
    if (!credentialsOk) {
      responseValue = {
        ret: 'failed',
        msg: 'Credentials are not good - either email or password is not correct'
      };
    }
    else {
      const jsonWebToken = sessionService.createJsonWebtoken(myEmail);
      responseValue = { ret: 'ok', msg: 'Credentials ok', 'json-web-token': jsonWebToken };
    }
  }

  const responseStatus = responseValue.ret === 'ok' ? 200 : 400;
  res.status(responseStatus).json(responseValue);
  logger.debug('EXIT server.postLogin');
}


/**
 * Get the product groups object.
 * @param {object} req http request
 * @param {object} res http response
 * @returns {object} - ret property 'ok' or 'failed'
 */
function getProductGroups(req, res) {
  logger.debug('ENTER server.getProductGroups');
  logger.trace('req.headers: ', req.headers);
  const auth = req.headers.authorization;
  const token = isValidToken(auth);
  let ret;
  let ok;
  if (token === null) {
    ret = { ret: 'failed', msg: 'Given token is not valid' };
    ok = false;
  }
  else {
    ret = domain.getProductGroups();
    ok = true;
  }
  res.status((ok ? 200 : 400)).json(ret);
  logger.debug('EXIT server.getProductGroups');
}


/**
 * Get the products list.
 * @param {object} req http request
 * @param {object} res http response
 * @returns {object} - ret property 'ok' or 'failed'
 */
function getProducts(req, res) {
  logger.debug('ENTER server.getProducts');
  logger.trace('req.headers: ', req.headers);
  const auth = req.headers.authorization;
  const token = isValidToken(auth);
  let ret;
  let ok;
  if (token === null) {
    ret = { ret: 'failed', msg: 'Given token is not valid' };
    ok = false;
  }
  else {
    const { pgId: myPgId } = req.params;
    ret = domain.getProducts(myPgId);
    ok = true;
  }
  res.status((ok ? 200 : 400)).json(ret);
  logger.debug('EXIT server.getProductGroups');
}


/**
 * Get the product groups object.
 * @param {object} req http request
 * @param {object} res http response
 * @returns {object} - ret property 'ok' or 'failed'
 */
function getProduct(req, res) {
  logger.debug('ENTER server.getProduct');
  logger.trace('req.headers: ', req.headers);
  const auth = req.headers.authorization;
  const token = isValidToken(auth);
  let ret;
  let ok;
  if (token === null) {
    ret = { ret: 'failed', msg: 'Given token is not valid' };
    ok = false;
  }
  else {
    const { pgId: myPgId } = req.params;
    const { pId: myPid } = req.params;
    ret = domain.getProduct(myPgId, myPid);
    ok = true;
  }
  res.status((ok ? 200 : 400)).json(ret);
  logger.debug('EXIT server.getProduct');
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
  myWebServer.post('/login', (req, res) => postLogin(req, res));
  myWebServer.get('/product-groups', (req, res) => getProductGroups(req, res));
  myWebServer.get('/products/:pgId', (req, res) => getProducts(req, res));
  myWebServer.get('/product/:pgId/:pId', (req, res) => getProduct(req, res));

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


/* eslint-disable object-curly-newline */
module.exports = { getWebServer };
