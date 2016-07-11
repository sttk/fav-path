'use strict';

var path = require('path');
var inspect = require('util').inspect;

module.exports = function(pth) {
  // less then 6.0
  if (typeof pth !== 'string') {
    throw new TypeError('Path must be a string, Received ' + inspect(pth));
  }

  pth = pth.replace(/\/+/g, '/');
  return path.dirname(pth);
};
