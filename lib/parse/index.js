'use strict';

var os = require('os');

switch (os.platform()) {
case 'win32':
  module.exports = require('./lib/win32');
  break;
default:
  module.exports = require('./lib/posix');
  break;
}
