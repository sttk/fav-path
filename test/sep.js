'use strict';

var testrun = require('testrun').mocha;
var path = require('../');

function testfn() {
  return path.sep;
}

testrun('#sep', testfn, [
  {
    name: 'should return correct path separator',
    expected: testrun.byPlatform({
      win32: '\\',
      otherwise: '/',
    }),
  },
]);
