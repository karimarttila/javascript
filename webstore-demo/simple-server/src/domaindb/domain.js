const papaparse = require('papaparse');
const fs = require('fs');
const loggerFactory = require('../util/logger');

const logger = loggerFactory();
const productGroupsCsvFile = 'resources/product-groups.csv';


// Simulates domain database.
const domain = {};

/**
 * Gets product groups.
 * Simulates the domain db, but actually just reads the CSV file.
 * @returns {object} product groups {<key>: <category>}
 */
function getProductGroups() {
  logger.debug('ENTER domain.getProductGroups');
  let productGroups = domain['product-groups'];
  if ((productGroups === null) || (productGroups === undefined)) {
    const csvContents = fs.readFileSync(productGroupsCsvFile, 'utf8');
    const rows = papaparse.parse(csvContents, { delimiter: '\t' }).data;
    const obj = {};
    rows.map((row) => {
      if (row.length === 2) {
        logger.trace(`row: ${JSON.stringify(row)}`);
        const [key, val] = row;
        obj[key] = val;
      }
      // Just for linter return dummy null, we are not interested of result of arrow function.
      return null;
    });
    productGroups = obj;
    domain['product-groups'] = productGroups;
  }
  logger.debug('EXIT domain.getProductGroups');
  return productGroups;
}


function getProducts(pgId) {
  logger.debug(`ENTER domain.getProducts, pgId: ${pgId}`);
  const productsKey = `pg-${pgId}-products`;
  let products = domain[productsKey];
  if ((products === null) || (products === undefined)) {
    const productsCsvFile = `resources/pg-${pgId}-products.csv`;
    const csvContents = fs.readFileSync(productsCsvFile, 'utf8');
    const rows = papaparse.parse(csvContents, { delimiter: '\t' }).data;
    const myList = [];
    rows.map((row) => {
      if (row.length === 8) {
        logger.trace(`row: ${JSON.stringify(row)}`);
        const [myPId, myPgId, myTitle, myPrice] = row;
        myList.push([myPId, myPgId, myTitle, myPrice]);
      }
      // Just for linter return dummy null, we are not interested of result of arrow function.
      return null;
    });
    products = myList;
    domain[productsKey] = products;
  }
  logger.debug('EXIT domain.getProducts');
  return products;
}


module.exports = { getProductGroups, getProducts };
