const assert = require('assert');
const us = require('underscore');
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
    // Read once more to get it from cache.
    const productGroups2 = JSON.parse(JSON.stringify(myDomain.getProductGroups()));
    logger.debug(`Got productGroups: ${JSON.stringify(productGroups2)}`);
    it('getProductGroups second time (from cache), returns object with 2 items', function () {
      assert.equal(Object.keys(productGroups2).length, 2);
      assert.equal(productGroups2['1'], 'Books');
      assert.equal(productGroups2['2'], 'Movies');
    });
  });
  describe('Should be 35 products in product group 1 / domain db', function () {
    const products = JSON.parse(JSON.stringify(myDomain.getProducts(1)));
    logger.debug(`Got products: ${JSON.stringify(products)}`);
    it('getProducts returns list with 35 items', function () {
      assert.equal(products.length, 35);
      // Test last and first product.
      assert.equal(us._.isEqual((products[0]), ['2001', '1', 'Kalevala', '3.95']), true);
      assert.equal(us._.isEqual((products[34]), ['2035', '1', 'Mielensäpahoittaja', '50.6']), true);
    });
  });
});
