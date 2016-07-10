'use strict';

var path = require('path');
var inspect = require('util').inspect;

module.exports = function(pth, ext) {
  // For less than 1.6
  if (typeof ext !== 'undefined' && typeof ext !== 'string') {
    throw new TypeError('"ext" argument must be a string');
  }

  // For less than 6.0
  if (typeof pth !== 'string') {
    throw new TypeError('Path must be a string. Received ' + inspect(pth));
  }

  // This part is for compatible behaviors to basename command.
  if ((pth = pth.replace(/\/+/g, '/')) === '/') {
    return '/';
  }
  if ((pth = pth.replace(/[\/\\\\]+/g, '\\')) === '\\') {
    return '\\';
  }

  // for less than 6.2.1
  var ret = path.basename(pth);
  var idx = ret.lastIndexOf(ext);
  if (idx <= 0 || ret.length !== idx + ext.length) {
    return ret;
  }
  return ret.slice(0, idx);
};
