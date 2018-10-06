const assert = require('assert');
const session = require('../../src/webserver/session');
const loggerFactory = require('../../src/util/logger');

const logger = loggerFactory();

// See: https://mochajs.org/#arrow-functions
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
describe('Session module', function () {
  let jwt;
  const testedEmail = 'kari.karttinen@foo.com';
  describe('Gets Json web token', function () {
    jwt = session.createJsonWebtoken(testedEmail);
    logger.trace('Got jwt: ', jwt);
    it('jwt is longer than 20 chars', function () {
      assert.equal((jwt.length > 20), true);
    });
  });
  describe('Validates Json web token', function () {
    const ret = session.validateJsonWebToken(jwt);
    const retEmail = ret.email;
    it('Got right email in jwt', function () {
      assert.equal(retEmail, testedEmail);
    });
  });
});
