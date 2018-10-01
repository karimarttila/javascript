const supertest = require('supertest');
const webServerFactory = require('../../src/webserver/server');
const loggerFactory = require('../../src/util/logger');

const logger = loggerFactory();

/* eslint-disable no-unused-vars */
let webServer = null;


// See: https://mochajs.org/#arrow-functions
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
describe('Webserver module', function () {
  before(function () {
    logger.debug('Before tests start the webserver...');
    webServer = webServerFactory();
  });
  after(function () {
    logger.debug('After tests shutdown the webserver...');
    webServer.close();
  });
  describe('GET /info', function () {
    it('Return the info message', function (done) {
      supertest(webServer)
        .get('/info')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          info: 'index.html => Info in HTML format'
        }, done);
    });
  });
});
