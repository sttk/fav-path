'use strict';

var path = require('path');
var inspect = require('util').inspect;

var semver = require('semver');
var version = process.version;

if (semver.gte(version, '6.0.0')) {
  module.exports = path.extname;
  return;
}

module.exports = function(pth) {
  if (typeof pth !== 'string') {
    throw new TypeError('Path must be a string, Received ' + inspect(pth));
  }

  return path.extname(pth);
};
