'use strict';

var testrun = require('testrun').mocha;
var path = require('../');
var isAbsolute = require('../lib/isAbsolute');

var testcases = [
 {
   name: 'When argument type is not a string',
   cases: [
    {
      name: 'And path is ${testcase.path} => ${testcase.error}',
      path: null,
      error: TypeError,
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.error}',
      path: true,
      error: TypeError,
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.error}',
      path: 1234,
      error: TypeError,
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.error}',
      path: {},
      error: TypeError,
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.error}',
      path: function fn() {},
      error: TypeError,
    },
   ],
 },
 {
   name: 'When path is absolute',
   cases: [
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: '/',
      expected: true,
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: '/aaa',
      expected: true,
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: '/aaa/bbb',
      expected: true,
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: '///',
      expected: true,
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: '////aaa/bbb',
      expected: true,
    },
   ],
 },
 {
   name: 'When path is not absolute',
   cases: [
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: '',
      expected: false,
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'aaa',
      expected: false,
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'aaa/',
      expected: false,
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'aaa/bbb',
      expected: false,
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'aaa////bbb',
      expected: false,
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'aaa////bbb////',
      expected: false,
    },
   ],
 },
 {
   name: 'When path is absolute (for Windows)',
   cases: [
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: '\\',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: '\\aaa',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: '\\aaa\\bbb',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'a:\\',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'c:\\',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'z:\\',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'A:\\',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'C:\\',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'Z:\\',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'C:\\abc',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'C:\\abc\\def',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'a:/',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'c:/',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'z:/',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'A:/',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'C:/',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'Z:/',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'C:/abc',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'C:/abc/def',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: '\\\\\\',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: '\\\\aaa',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: '\\\\\\aaaa\\\\',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: '\\//\\\\//',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: '\\/\\\\aaa//bbb\\',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: '\\C:\\',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: '/A:\\aaa',
      expected: testrun.byPlatform({ win32: true, otherwise: true }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'C:\\\\\\aaa\\bbb',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'C:///aaa/bbb',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'C:\\//\\\\aaa\\bbb',
      expected: testrun.byPlatform({ win32: true, otherwise: false }),
    },
   ],
 },
 {
   name: 'When path is not absolute (for Windows)',
   cases: [
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: '',
      expected: false,
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'aaa\\bbb',
      expected: false,
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'A\\bbb',
      expected: false,
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'A::\\bc',
      expected: false,
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'A:bbb\\ccc',
      expected: false,
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: '3:\\aaa',
      expected: false,
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: '#:\\aaa',
      expected: false,
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'C;\\aaa',
      expected: false,
    },
    {
      name: 'And path is ${testcase.path} => ${testcase.expected}',
      path: 'C:|aaa',
      expected: false,
    },
   ],
 },
];


function testfnPathIsAbsolute(testcase) {
  return path.isAbsolute(testcase.path);
}

function testfnIsAbsolute(testcase) {
  return isAbsolute(testcase.path);
}

testrun('#isAbsolute (path.isAbsolute)', testfnPathIsAbsolute, testcases);
testrun('#isAbsolute (isAbsolute)', testfnIsAbsolute, testcases);
