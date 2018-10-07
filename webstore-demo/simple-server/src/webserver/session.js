const jsonwebtoken = require('jsonwebtoken');
const randomstring = require('randomstring');
const prop = require('../util/prop');

const loggerFactory = require('../util/logger');

const logger = loggerFactory();
const mySecret = randomstring.generate();
const expSecs = prop.getIntValue('json-web-token-expiration-as-seconds');
const mySessions = new Set([]);

/**
 * Creates JSON web token and adds it to sessions set.
 * @param {string} userEmail - user email
 * @returns {string} JSON web token
 */
function createJsonWebtoken(userEmail) {
  logger.debug('ENTER session.createJsonWebToken');
  const myNow = new Date();
  const mySeconds = Math.round(myNow.getTime() / 1000);
  const expTime = Math.round(mySeconds + expSecs);
  const myClaim = { email: userEmail };
  const jsonWebToken = jsonwebtoken.sign({
    exp: expTime,
    data: myClaim
  }, mySecret);
  // Shouldn't log token, but this is an exercise.
  logger.trace(`jsonWebToken: ${jsonWebToken}`);
  mySessions.add(jsonWebToken);
  logger.trace('mySessions now: ', Array.from(mySessions));
  logger.debug('EXIT session.createJsonWebToken');
  return jsonWebToken;
}

/**
 * Validates the token. Returns {:email :exp} from token if session ok, null otherwise.
  Token validation has two parts:
  1. Check that we actually created the token in the first place (should find it in my-sessions set.
  2. Validate the actual token (can unsign it, token is not expired)."
 * @param {string} jwt
 * @return {object} object {:email :exp} if ok, null otherwise
 */
function validateJsonWebToken(jwt) {
  logger.debug('ENTER session.validateJsonWebToken');
  let ret;
  // Validation #1.
  const found = mySessions.has(jwt);
  if (!found) {
    logger.warn('Token not found in my sessions - unknown token: ', jwt);
    ret = null;
  }
  // Validatioin #2.
  else {
    try {
      const payload = jsonwebtoken.verify(jwt, mySecret);
      logger.trace('Got payload: ', payload);
      const { exp: myExp, data: myData } = payload;
      const { email: myEmail } = myData;
      ret = { exp: myExp, email: myEmail };
      logger.trace('Validated token, returning: ', ret);
    }
    catch (err) {
      if (err.name === 'TokenExpiredError') {
        // Expired or some other error
        logger.warn('Token is expired, removing it from my sessions and returning nil: ', jwt);
      }
      else {
        logger.error('Some error in session handling: ', err);
      }
    }
  }

  logger.debug('EXIT session.validateJsonWebToken');
  return ret;
}

/* eslint-disable object-curly-newline */
module.exports = { createJsonWebtoken, validateJsonWebToken };
