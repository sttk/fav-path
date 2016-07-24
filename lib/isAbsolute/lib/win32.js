'use strict';

var path = require('path');
var inspect = require('util').inspect;

var semver = require('semver');
var version = process.version;

if (path.isAbsolute &&
    (semver.gte(version, '1.0.0') || semver.lt(version, '0.12.0'))) {
  module.exports = path.isAbsolute;
  return;
}

module.exports = function(pth) {
  if (typeof pth !== 'string') {
    throw new TypeError(
      'Path must be a string, Received ' + inspect(pth));
  }

  if (pth[0] === '/') {
    return true;
  }

  if (pth[0] === '\\') {
    return true;
  }

  if (/^[A-Za-z]:[\\/]/.test(pth)) {
    return true;
  }

  return false;
};
