const papaparse = require('papaparse');
const fs = require('fs');
const loggerFactory = require('../util/logger');

const logger = loggerFactory();
const productGroupsCsvFile = 'resources/product-groups.csv';

// Simulates domain database.
let productGroups = null;

/**
 * Gets product groups.
 * Simulates the domain db, but actually just reads the CSV file.
 * @returns {object} product groups {<key>: <category>}
 */
function getProductGroups() {
  logger.debug('ENTER domain.getProductGroups');
  if (productGroups === null) {
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
    logger.debug('EXIT domain.getProductGroups');
    productGroups = obj;
  }
  return productGroups;
}


module.exports = { getProductGroups };
