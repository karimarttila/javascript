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
    hashed_password: '1340477763',
  },
  2: {
    userid: '2',
    email: 'timo.tillinen@foo.com',
    first_name: 'Timo',
    last_name: 'Tillinen',
    hashed_password: '-36072128',
  },
  3: {
    userid: '3',
    email: 'erkka.erkkila@foo.com',
    first_name: 'Erkka',
    last_name: 'Erkkilä',
    hashed_password: '1655387230',
  },
};


// A Javascript closure example.
const idAdder = (function myAdder() {
  let counter = 3; // Initial value;
  // Return a function which encloses the free variable counter,
  // and assign the function to variable idAdder.
  return function myCounter() {
    counter += 1; return counter;
  };
}());

function getUsers() {
  logger.debug('ENTER users.getUsers');
  logger.debug('EXIT users.getUsers');
  return users;
}

function emailAlreadyExists(givenEmail) {
  logger.debug(`ENTER users.emailAlreadyExists, email: ${givenEmail}`);
  // Dump users into an array for the find function.
  const myUsers = Object.values(users);
  // An arrow function example.
  const result = myUsers.find(user => user.email === givenEmail);
  logger.debug(`EXIT users.emailAlreadyExists, result: ${result}`);
  return (typeof (result) === 'object');
}

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

module.exports = { getUsers, addUser, emailAlreadyExists };
