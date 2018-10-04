const PropertiesReader = require('properties-reader');
const loggerFactory = require('../util/logger');

const logger = loggerFactory();

const properties = PropertiesReader('resources/simpleserver.properties');

/**
 * Get int value.
 * @param {string} key - Key
 * @returns {int} int value or undefined if not found
 */
function getIntValue(key) {
  logger.debug('ENTER prop.getIntValue');
  const value = parseInt(properties.get(key), 10);
  logger.debug('ENTER prop.getIntValue');
  return value;
}

/**
 * Get string value.
 * @param {string} key - Key
 * @returns {string} string value or undefined if not found
 */
function getStringValue(key) {
  logger.debug('ENTER prop.getStringValue');
  const value = properties.get(key);
  logger.debug('ENTER prop.getStringValue');
  return value;
}

/* eslint-disable object-curly-newline */
module.exports = { getIntValue, getStringValue };
