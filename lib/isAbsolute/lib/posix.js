'use strict';

var path = require('path');
var inspect = require('util').inspect;

if (path.isAbsolute) {
  module.exports = path.isAbsolute;
  return;
}

module.exports = function(pth) {
  if (typeof pth !== 'string') {
    throw new TypeError(
      'Path must be a string, Received ' + inspect(pth));
  }

  return (pth[0] === '/');
};
