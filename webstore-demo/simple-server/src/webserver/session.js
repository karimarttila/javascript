const jsonwebtoken = require('jsonwebtoken');
const randomstring = require('randomstring');
const prop = require('../util/prop');

const loggerFactory = require('../util/logger');

const logger = loggerFactory();
const mySecret = randomstring.generate();
const expSecs = prop.getIntValue('json-web-token-expiration-as-seconds');


/**
 * Creates JSON web token.
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
  logger.debug('EXIT session.createJsonWebToken');
  return jsonWebToken;
}


/* eslint-disable object-curly-newline */
module.exports = { createJsonWebtoken };
