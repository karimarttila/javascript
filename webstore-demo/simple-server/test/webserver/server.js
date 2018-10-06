const supertest = require('supertest');
const assert = require('assert');
const request = require('request');

const webServerFactory = require('../../src/webserver/server');
const loggerFactory = require('../../src/util/logger');
const prop = require('../../src/util/prop');

const logger = loggerFactory();

/* eslint-disable no-unused-vars */
let webServer = null;

function getJsonWebToken() {
  logger.debug('ENTER getJsonWebToken');
  let jsonWebToken;
  const port = prop.getIntValue('port');
  const myUrl = `http://localhost:${port}/login`;
  const myData = {
    email: 'kari.karttinen@foo.com', password: 'Kari'
  };

  return new Promise(((resolve, reject) => {
    request.post({ url: myUrl, json: myData },
      (err, res, body) => {
        if (err) {
          logger.error(`Something went wrong, err:: ${err}`);
        }
        logger.trace(`Successful post, body: ${body}`);
        const jwt = body['json-web-token'];
        logger.trace(`jwt: ${jwt}`);
        jsonWebToken = jwt;
        resolve(jsonWebToken);
      });
  }));
}


// See: https://mochajs.org/#arrow-functions
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
describe('Webserver module', function () {
  before(function () {
    logger.debug('Before tests start the webserver...');
    webServer = webServerFactory.getWebServer();
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
  describe('POST /signin', function () {
    it('Successful POST: /login', function (done) {
      supertest(webServer)
        .post('/login')
        .send({
          'first-name': 'Kari', 'last-name': 'Karttinen', email: 'kari.karttinen@foo.com', password: 'Kari'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          // Test that we got something for json-web-token.
          assert.equal(response.body['json-web-token'].length > 20, true);
          assert.equal(response.body.ret, 'ok');
          assert.equal(response.body.msg, 'Credentials ok');
          done();
        });
    });
    it('Unsuccessful POST: /login', function (done) {
      supertest(webServer)
        .post('/login')
        .send({
          'first-name': 'Kari', 'last-name': 'Karttinen', email: 'kari.karttinen@foo.com', password: 'WRONG-PASSWORD'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then((response) => {
          // Test that we got something for json-web-token.
          assert.equal(response.body.ret, 'failed');
          assert.equal(response.body.msg, 'Credentials are not good - either email or password is not correct');
          done();
        });
    });
  });
  describe('GET /product-groups', function () {
    let jwt;
    it('Get Json web token', async () => {
      const jsonWebToken = await getJsonWebToken();
      logger.trace('Got jsonWebToken: ', jsonWebToken);
      assert.equal(jsonWebToken.length > 20, true);
      jwt = jsonWebToken;
    });
    it('Successful GET: /product-groups ', function (done) {
      logger.trace('Using jwt: ', jwt);
      supertest(webServer)
        .get('/product-groups')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          1: 'Books',
          2: 'Movies'
        }, done);
    });
  });
});
