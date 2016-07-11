'use strict';

var path = require('path');

var semver = require('semver');
var version = process.version;

if (path.format && semver.gte(version, '5.7.0')) {
  module.exports = function(pathObj) {
    if (pathObj == null || typeof pathObj !== 'object') {
      return path.format(pathObj);
    }
    return path.format({
      root: typeof pathObj.root === 'string' ? pathObj.root : undefined,
      dir : typeof pathObj.dir  === 'string' ? pathObj.dir  : undefined,
      base: typeof pathObj.base === 'string' ? pathObj.base : undefined,
      name: typeof pathObj.name === 'string' ? pathObj.name : undefined,
      ext : typeof pathObj.ext  === 'string' ? pathObj.ext  : undefined,
    });
  };
  return;
}

module.exports = function(pathObj) {
  if (pathObj == null || typeof pathObj !== 'object') {
    throw new TypeError(
      'Parameter "pathObject" must be an object, not object');
  }

  var pathStr = '';
  if (typeof pathObj.dir === 'string') {
    pathStr += pathObj.dir;
    if (pathStr.charAt(pathStr.length - 1) !== '/') {
      pathStr += '/';
    }
  } else if (typeof pathObj.root === 'string') {
    pathStr += pathObj.root;
  } else {
    pathStr = '';
  }

  if (typeof pathObj.base === 'string') {
    pathStr += pathObj.base;
  } else {
    if (typeof pathObj.name === 'string') {
      pathStr += pathObj.name;
    }
    if (typeof pathObj.ext === 'string') {
      pathStr += pathObj.ext;
    }
  }

  return pathStr;
};
