'use strict';

var path = require('path');

module.exports = function(from, to) {
  var rpath = path.relative(from, to);
  if (rpath.slice(-3) === '../') {
    return rpath.slice(0, -1);
  }
  return rpath;
};
