'use strict';

var path = require('path');
var inspect = require('util').inspect;

var semver = require('semver');
var version = process.version;

if (path.parse) {
  module.exports = function(pth) {
    var pathObj = path.parse(pth);
    if (semver.gte(version, '5.0.0')) {
      if (pathObj.base === '..') {
        pathObj.name = '..';
        pathObj.ext = '';
      }
    }
    if (pathObj.root && !pathObj.dir) {
      pathObj.dir = pathObj.root;
      pathObj.base = path.basename(pth);
      pathObj.ext = path.extname(pathObj.base);
      pathObj.name = path.basename(pathObj.base, pathObj.ext);
    }
    return pathObj;
  };
  return;
}

module.exports = function(pth) {
  if (typeof pth !== 'string') {
    throw new TypeError('Path must be a string. Received ' + inspect(pth));
  }

  var root = '',
      dir = '',
      base = '',
      ext = '';

  if (/^[A-Za-z]:/.test(pth)) {
    root = pth.slice(0, 2);
    pth = pth.slice(2);
  }

  if (pth[0] === '\\' || pth[0] === '/') {
    root += pth[0];
    pth = pth.slice(1);
  }
  pth = pth.replace(/[\/|\\\\]+$/, '');

  var idx = -1;
  for (var i = pth.length - 1; i >= 0; i--) {
    if (pth[i] === '\\' || pth[i] === '/') {
      idx = i;
      break;
    }
  }

  if (idx > 0) {
    base = pth.slice(idx + 1);
    dir = pth.slice(0, idx);
  } else if (idx === 0) {
    base = pth.slice(1);
    dir = pth[0];
  } else {
    base = pth;
    dir = '';
  }

  var ext = path.extname(base);
  var name = path.basename(base, ext);

  return {
    dir: root + dir,
    base: base,
    ext: ext,
    name: name,
    root: root,
  };
};
