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
 * Validates the given Json web token.
 * @param {string} jwt
 * @return {object} object with email and exp fields if ok, null otherwise
 */
function validateJsonWebToken(jwt) {
  logger.debug('ENTER session.validateJsonWebToken');
  const payload = jsonwebtoken.verify(jwt, mySecret);
  logger.trace('Got payload: ', payload);
  const { exp: myExp, data: myData } = payload;
  const { email: myEmail } = myData;
  logger.debug('EXIT session.validateJsonWebToken');
  return { exp: myExp, email: myEmail };
}

/* eslint-disable object-curly-newline */
module.exports = { createJsonWebtoken, validateJsonWebToken };
