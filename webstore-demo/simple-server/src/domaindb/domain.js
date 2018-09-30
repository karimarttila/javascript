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

// Internal function to load the products to the domain db.
function loadProducts(pgId) {
  logger.debug(`ENTER domain.loadProducts, pgId: ${pgId}`);
  const productsKey = `pg-${pgId}-products`;
  const rawProductsKey = `pg-${pgId}-raw-products`;
  const products = domain[productsKey];
  if ((products === null) || (products === undefined)) {
    const productsCsvFile = `resources/pg-${pgId}-products.csv`;
    const csvContents = fs.readFileSync(productsCsvFile, 'utf8');
    const rows = papaparse.parse(csvContents, { delimiter: '\t' }).data;
    const myProductsList = [];
    const myRawProductsList = [];
    rows.map((row) => {
      if (row.length === 8) {
        logger.trace(`row: ${JSON.stringify(row)}`);
        // Variable destructuring example.
        const [myPId, myPgId, myTitle, myPrice, myAuthor, myYear, myCountry, myLanguage] = row;
        myProductsList.push([myPId, myPgId, myTitle, myPrice]);
        myRawProductsList.push(
          [myPId, myPgId, myTitle, myPrice, myAuthor, myYear, myCountry, myLanguage]
        );
      }
      // Just for linter return dummy null, we are not interested of result of arrow function.
      return null;
    });
    domain[productsKey] = myProductsList;
    domain[rawProductsKey] = myRawProductsList;
  }
  logger.debug('EXIT domain.loadProducts');
}

/**
 * Gets products for product group 'pgId'.
 * @param {int} pgId - Product group id
 * @returns {list} products
 */
function getProducts(pgId) {
  logger.debug(`ENTER domain.getProducts, pgId: ${pgId}`);
  const productsKey = `pg-${pgId}-products`;
  let products = domain[productsKey];
  if ((products === null) || (products === undefined)) {
    loadProducts(pgId);
    products = domain[productsKey];
  }
  logger.debug('EXIT domain.getProducts');
  return products;
}

/**
 * Gets a product for product group 'pgId' and product id 'pId'.
 * @param {int} pgId - Product group id
 * @param {int} pId - Product id
 */
function getProduct(pgId, pId) {
  logger.debug(`ENTER domain.getProduct, pgId: ${pgId}, pId: ${pId}`);
  const rawProductsKey = `pg-${pgId}-raw-products`;
  let rawProducts = domain[rawProductsKey];
  if ((rawProducts === null) || (rawProducts === undefined)) {
    loadProducts(pgId);
    rawProducts = domain[rawProductsKey];
  }
  const filtered = rawProducts.filter(row => row[0] === `${pId}` && row[1] === `${pgId}`);
  const product = filtered[0];
  logger.debug('EXIT domain.getProduct');
  return product;
}


module.exports = { getProductGroups, getProducts, getProduct };
