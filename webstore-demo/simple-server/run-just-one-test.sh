#!/bin/bash

# A way to run just a single test.
SS_LOG_LEVEL=trace ./node_modules/.bin/mocha test/webserver/session.js
#SS_LOG_LEVEL=trace ./node_modules/.bin/mocha --grep "GET /product-groups" test/webserver/server.js


