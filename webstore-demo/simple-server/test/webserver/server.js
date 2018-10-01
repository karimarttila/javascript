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
  describe('POST /signin', function () {
    it('Successful POST: /signin', function (done) {
      supertest(webServer)
        .post('/signin')
        .send({
          'first-name': 'Jamppa', 'last-name': 'Jamppanen', email: 'jamppa.jamppanen@foo.com', password: 'Jamppa'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          email: 'jamppa.jamppanen@foo.com',
          ret: 'ok'
        }, done);
    });
    it('Unsuccessful POST: /signin (same email again)', function (done) {
      supertest(webServer)
        .post('/signin')
        .send({
          'first-name': 'Jamppa', 'last-name': 'Jamppanen', email: 'jamppa.jamppanen@foo.com', password: 'Jamppa'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, {
          email: 'jamppa.jamppanen@foo.com',
          msg: 'Email already exists',
          ret: 'failed'
        }, done);
    });
  });
});
