'use strict';

var path = require('path');

module.exports = function(/* path ... */) {
  var args = [];
  for (var i = 0, n = arguments.length; i < n; i++) {
    args.push(arguments[i].replace(/[\\/]+/g, '\\'));
  }
  return path.join.apply(path, args);
};
