'use strict';

var path = require('path');

module.exports = function(from, to) {
  from = from.replace(/(\/|\\)+/g, '\\');
  to = to.replace(/(\/|\\)+/g, '\\');
  return path.relative(from, to);
};
