'use strict';

var testrun = require('testrun').mocha;
var path = require('../');

function testfn() {
  return path.delimiter;
}

testrun('#delimiter', testfn, [
  {
    name: 'should return correct path delimiter',
    expected: testrun.byPlatform({
      win32: ';',
      otherwise: ':',
    }),
  },
]);
