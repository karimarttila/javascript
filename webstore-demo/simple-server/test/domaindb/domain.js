const assert = require('assert');
// const us = require('underscore');
const myDomain = require('../../src/domaindb/domain');
const loggerFactory = require('../../src/util/logger');

const logger = loggerFactory();


// See: https://mochajs.org/#arrow-functions
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
describe('DomainDB module', function () {
  describe('Should be two product groups in domain db', function () {
    const productGroups = JSON.parse(JSON.stringify(myDomain.getProductGroups()));
    logger.debug(`Got productGroups: ${JSON.stringify(productGroups)}`);
    it('getProductGroups returns object with 2 items', function () {
      assert.equal(Object.keys(productGroups).length, 2);
      assert.equal(productGroups['1'], 'Books');
      assert.equal(productGroups['2'], 'Movies');
    });
  });
});
