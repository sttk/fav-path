'use strict';

var path = require('path');
var inspect = require('util').inspect;

var semver = require('semver');
var version = process.version;

module.exports = function(pth) {
  if (semver.lt(version, '1.7.1')) {
    if (typeof pth !== 'string') {
      throw new TypeError('Path must be a string. Received ' + inspect(pth));
    }
  }

  pth = pth.replace(/[\/\\\\]+/g, '\\');
  return path.normalize(pth);
};

