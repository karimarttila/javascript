// First testing a REPL extension with this file but wasn't that happy with it.
// You can run this file in repl directory as: node userdb-testing1.js

const myUsers = require('../src/userdb/users');
const loggerFactory = require('../src/util/logger');

// Logger not working in REPL for some reason.
const logger = loggerFactory();

logger.debug('******* FIRST ************');
const users1 = JSON.parse(JSON.stringify(myUsers.getUsers()));
logger.debug(users1);
const res1 = myUsers.emailAlreadyExists('a');
logger.debug(`res1: ${res1}`);
myUsers.addUser('a', 'b', 'c', 'd');
const res2 = myUsers.emailAlreadyExists('a');
logger.debug(`res2: ${res2}`);
logger.debug('******* SECOND ************');
const users2 = JSON.parse(JSON.stringify(myUsers.getUsers()));
logger.debug(users2);
myUsers.addUser('a', 'b', 'c', 'd');
logger.debug('******* THIRD ************');
const users3 = JSON.parse(JSON.stringify(myUsers.getUsers()));
logger.debug(users3);
logger.debug('******* FOURTH ************');


