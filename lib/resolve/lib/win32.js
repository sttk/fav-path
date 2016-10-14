'use strict';

var path = require('path');

module.exports = function(/*...paths*/) {
  var ret = path.resolve.apply(path, arguments);
  if (ret[0] === path.sep) {
    ret = ret.replace(/[/\\]+/g, '\\');
    ret = path.resolve(ret);
  }
  return ret;
};
