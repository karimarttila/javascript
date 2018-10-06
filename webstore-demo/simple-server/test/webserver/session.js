const assert = require('assert');
const sleep = require('sleep');
const session = require('../../src/webserver/session');
const loggerFactory = require('../../src/util/logger');

const logger = loggerFactory();

// See: https://mochajs.org/#arrow-functions
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
describe('Session module', function () {
  // Just check the expiration manually (maybe automate later).
  // Set simpleserver.properties: json-web-token-expiration-as-seconds=1
  // and checkExpiration value to true.
  const checkExpiration = false; // Just manually.
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
    if (checkExpiration) {
      sleep.sleep(2);
    }
    const ret = session.validateJsonWebToken(jwt);
    if (checkExpiration) {
      it('Got null since token expired', function () {
        assert.equal(ret, null);
      });
    }
    else {
      const retEmail = ret.email;
      it('Got right email in jwt', function () {
        assert.equal(retEmail, testedEmail);
      });
    }
  });
});
