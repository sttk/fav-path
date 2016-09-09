'use strict';

var path = require('path');

var apis = [
  { name: 'basename', body: require('./lib/basename') },
  'delimiter',
  { name: 'dirname', body: require('./lib/dirname') },
  { name: 'extname', body: require('./lib/extname') },
  { name: 'format', body: require('./lib/format') },
  { name: 'isAbsolute', body: require('./lib/isAbsolute') },
  { name: 'join', body: require('./lib/join') },
  { name: 'normalize', body: require('./lib/normalize') },
  { name: 'parse', body: require('./lib/parse') },
  { name: 'relative', body: require('./lib/relative') },
//  'resolve',
  'sep',
];

var pathing = {};
for (var i = 0, n = apis.length; i < n; i++) {
  define(pathing, apis[i]);
}
module.exports = pathing;

function define(obj, api) {
  var name;
  var body;

  if (typeof api === 'string') {
    name = api;
    body = path[name];
    if (!body) {
      body = require('./lib/' + name);
    }
  } else {
    name = api.name;
    body = api.body;
  }

  Object.defineProperty(obj, name, {
    value: body,
    writable: false,
    enumerable: true,
    configurable: false,
  });
}
