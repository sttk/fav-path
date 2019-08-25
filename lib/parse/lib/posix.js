'use strict';

var path = require('path');
var inspect = require('util').inspect;

var semver = require('semver');
var version = process.version;

if (path.parse) {
  if (semver.satisfies(version, '4.9.x || >=5.7.0')) {
    module.exports = function(pth) {
      var pathObj = path.parse(pth);
      if (pathObj.base === '..') {
        pathObj.name = '..';
        pathObj.ext = '';
      }
      return pathObj;
    };
    return;
  }
  module.exports = path.parse;
  return;
}

module.exports = function(pth) {
  if (typeof pth !== 'string') {
    throw new TypeError('Path must be a string. Received ' + inspect(pth));
  }

  var root = '',
      dir = '',
      base = '',
      name = '',
      ext = '';

  if (pth[0] === '/') {
    root = '/';
    pth = pth.slice(1).replace(/^\/+/, '');
  }
  pth = root + pth.replace(/\/+$/, '');

  var idx = pth.lastIndexOf('/');
  if (idx > 0) {
    base = pth.slice(idx + 1);
    dir = pth.slice(0, idx);
  } else if (idx === 0) {
    base = pth.slice(1);
    dir = '/';
  } else {
    base = pth;
    dir = '';
  }

  var ext = path.extname(base);
  var name = path.basename(base, ext);

  return {
    dir: dir,
    base: base,
    name: name,
    ext: ext,
    root: root,
  };
};
