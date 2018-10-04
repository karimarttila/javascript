const assert = require('assert');
const us = require('underscore');
const myUsers = require('../../src/userdb/users');

// See: https://mochajs.org/#arrow-functions
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
describe('UserDB module', function () {
  describe('Initially 3 users in db', function () {
    const initialUsers = JSON.parse(JSON.stringify(myUsers.getUsers()));
    it('getUsers returns 3', function () {
      assert.equal(Object.keys(initialUsers).length, 3);
    });
  });
  describe('emailAlreadyExists for existing and non-existing email', function () {
    it('Existing user should return true', function () {
      assert.equal(myUsers.emailAlreadyExists('kari.karttinen@foo.com'), true);
    });
    it('Non-existing user should return false', function () {
      assert.equal(myUsers.emailAlreadyExists('non-existing@foo.com'), false);
    });
  });
  describe('Adding new user', function () {
    const initialUsers = JSON.parse(JSON.stringify(myUsers.getUsers()));
    it('getUsers returns 3', function () {
      assert.equal(Object.keys(initialUsers).length, 3);
    });
    const newUserRet = myUsers.addUser('foo1@foo.com', 'Steve', 'Stevenson', 'passw0rd');
    const newUsers = JSON.parse(JSON.stringify(myUsers.getUsers()));
    it('getUsers returns 4 after adding new user', function () {
      assert.equal(Object.keys(newUsers).length, 4);
    });
    it('Return value of adding new user is ok', function () {
      // Test result property by property...
      assert.equal(newUserRet.email, 'foo1@foo.com');
      assert.equal(newUserRet.ret, 'ok');
      // Or use underscore library to test equality of two objects...
      assert.equal(us._.isEqual((newUserRet), { email: 'foo1@foo.com', ret: 'ok' }), true);
    });
    // Trying to add the same user again.
    const newUser2Ret = myUsers.addUser('foo1@foo.com', 'Steve', 'Stevenson', 'passw0rd');
    it('Return value of adding new user twice is failed', function () {
      // Test result property by property...
      assert.equal(newUser2Ret.email, 'foo1@foo.com');
      assert.equal(newUser2Ret.ret, 'failed');
      // Or use underscore library to test equality of two objects...
      assert.equal(us._.isEqual((newUser2Ret), { email: 'foo1@foo.com', ret: 'failed', msg: 'Email already exists' }), true);
    });
    const newUsers2 = JSON.parse(JSON.stringify(myUsers.getUsers()));
    it('getUsers returns still 4 after adding new user again', function () {
      assert.equal(Object.keys(newUsers2).length, 4);
    });
  });
  describe('Check user credentials', function () {
    const retOk = myUsers.checkCredentials('kari.karttinen@foo.com', 'Kari');
    const retNotOk = myUsers.checkCredentials('kari.karttinen@foo.com', 'WRONG-PASSWORD');
    it('User credentials ok for valid credentials', function () {
      assert.equal(retOk, true);
    });
    it('User credentials not ok for non-valid credentials', function () {
      assert.equal(retNotOk, false);
    });
  });
});
