const stringHash = require('string-hash');
const loggerFactory = require('../util/logger');

const logger = loggerFactory();


// Simulates initial database.
const users = {
  1: {
    userid: '1',
    email: 'kari.karttinen@foo.com',
    first_name: 'Kari',
    last_name: 'Karttinen',
    hashed_password: '2087856692',
  },
  2: {
    userid: '2',
    email: 'timo.tillinen@foo.com',
    first_name: 'Timo',
    last_name: 'Tillinen',
    hashed_password: '2087903674',
  },
  3: {
    userid: '3',
    email: 'erkka.erkkila@foo.com',
    first_name: 'Erkka',
    last_name: 'Erkkilä',
    hashed_password: '170251027',
  },
};


/**
 * A simpler counter function. Also a Javascript closure example.
 * @returns next id
 */
const idAdder = (function myAdder() {
  let counter = 3; // Initial value;
  // Return a function which encloses the free variable counter,
  // and assign the function to variable idAdder.
  return function myCounter() {
    counter += 1; return counter;
  };
}());


/**
 * Gets the users.
 * @returns users in the user db
 */
function getUsers() {
  logger.debug('ENTER users.getUsers');
  logger.debug('EXIT users.getUsers');
  return users;
}


/**
 * Checks if given email address already exists in the users db.
 * @param {string} givenEmail - email to check
 * @returns true - email already exists, false otherwise
 */
function emailAlreadyExists(givenEmail) {
  logger.debug(`ENTER users.emailAlreadyExists, email: ${givenEmail}`);
  // Dump users into an array for the find function.
  const myUsers = Object.values(users);
  // An arrow function example.
  const result = myUsers.find(user => user.email === givenEmail);
  logger.debug(`EXIT users.emailAlreadyExists, result: ${result}`);
  return (typeof (result) === 'object');
}


/**
 * Adds a new user.
 * @param {string} newEmail - user email
 * @param {string} firstName - user first name
 * @param {string} lastName - user last name
 * @param {string} password - user password
 * @returns {object} with property ret is 'ok' or 'failed'
 */
function addUser(newEmail, firstName, lastName, password) {
  logger.debug('ENTER users.addUser');
  let ret;
  if (!emailAlreadyExists(newEmail)) {
    const newUser = {};
    const newId = idAdder();
    const newStrId = `${newId}`;
    const hashedPassword = stringHash(password);
    newUser.userid = newStrId;
    newUser.email = newEmail;
    newUser.first_name = firstName;
    newUser.last_name = lastName;
    newUser.hashed_password = `${hashedPassword}`;
    // Side effect: The new user is actually a new property of the users object.
    users[newId] = newUser;
    ret = { email: newEmail, ret: 'ok' };
  }
  else {
    logger.debug(`Failure: email already exists: ${newEmail}`);
    ret = { email: newEmail, ret: 'failed', msg: 'Email already exists' };
  }
  logger.debug('EXIT users.addUser');
  return ret;
}


/**
 * Checks credentials.
 * @param {string} userEmail - user email
 * @param {string} userPassword - user password
 * @returns {boolean} true - credentials ok, false otherwise
 */
function checkCredentials(userEmail, userPassword) {
  logger.debug('ENTER users.checkCredentials');
  const hashedPassword = (stringHash(userPassword)).toString();
  const foundUser = Object.values(users)
    .find(user => user.email === userEmail
      && user.hashed_password === hashedPassword);
  const ret = (!((foundUser === undefined) || (foundUser === null)));
  logger.debug('EXIT users.checkCredentials');
  return ret;
}

/* eslint-disable object-curly-newline */
module.exports = { getUsers, addUser, emailAlreadyExists, checkCredentials };
