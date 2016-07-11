'use strict';

var testrun = require('testrun').mocha;
var byPlatform = testrun.byPlatform;

var path = require('../');
var format = require('../lib/format');

var testcases = [
  {
    name: 'When argument type is not an object',
    cases: [
      {
        name: 'And pathObj is ${testcase.pathObj} => ${testcase.error}',
        pathObj: null,
        error: TypeError,
      },
      {
        name: 'And pathObj is ${testcase.pathObj} => ${testcase.error}',
        pathObj: 'aaa/bbb',
        error: TypeError,
      },
      {
        name: 'And pathObj is ${testcase.pathObj} => ${testcase.error}',
        pathObj: 1234,
        error: TypeError,
      },
      {
        name: 'And pathObj is ${testcase.pathObj} => ${testcase.error}',
        pathObj: function() {},
        error: TypeError,
      },
      {
        name: 'And pathObj is ${testcase.pathObj} => ${testcase.expected}',
        pathObj: [],
        expected: '',
      },
    ],
  },
  {
    name: 'When argument type is an object',
    cases: [
      {
        name: 'And the argument has no property',
        pathObj: {},
        expected: '',
      },
      {
        name: 'And the argument has `dir` property',
        pathObj: {
          dir: 'path/to',
        },
        expected: byPlatform({
          win32: 'path/to\\',
          otherwise: 'path/to/',
        }),
      },
      {
        name: 'And the argument has `root` property',
        pathObj: {
          root: '/',
        },
        expected: byPlatform({
          win32: '/',
          otherwise: '/',
        }),
      },
      {
        name: 'And the argument has `base` property',
        pathObj: {
          base: 'file.txt',
        },
        expected: 'file.txt',
      },
      {
        name: 'And the argument has `name` property',
        pathObj: {
          name: 'file',
        },
        expected: 'file',
      },
      {
        name: 'And the argument has `ext` property',
        pathObj: {
          ext: '.txt',
        },
        expected: '.txt',
      },
      {
        name: 'And the argument has `name` and `ext` properties',
        pathObj: {
          name: 'file',
          ext: '.txt',
        },
        expected: 'file.txt',
      },
      {
        name: 'And the argument has `dir` and `base` properties',
        pathObj: {
          dir: 'path/to',
          base: 'file.txt',
        },
        expected: byPlatform({
          win32: 'path/to\\file.txt',
          otherwise: 'path/to/file.txt',
        }),
      },
      {
        name: 'And the argument has `dir`, `name` and `ext` properties',
        pathObj: {
          dir: 'path/to',
          name: 'file',
          ext: '.txt',
        },
        expected: byPlatform({
          win32: 'path/to\\file.txt',
          otherwise: 'path/to/file.txt',
        }),
      },
      {
        name: 'And the argument has `root` and `base` properties',
        pathObj: {
          root: '/',
          base: 'file.txt',
        },
        expected: byPlatform({
          win32: '/file.txt',
          otherwise: '/file.txt',
        }),
      },
      {
        name: 'And the argument has `root`, `name` and `ext` properties',
        pathObj: {
          root: '/',
          name: 'file',
          ext: '.txt',
        },
        expected: '/file.txt',
      },
      {
        name: 'And the argument has both `root` and `dir` => ' +
              'use `dir` preferentially',
        pathObj: {
          dir: 'path/to',
          name: 'file',
          ext: '.txt',
        },
        expected: byPlatform({
          win32: 'path/to\\file.txt',
          otherwise: 'path/to/file.txt',
        }),
      },
      {
        name: 'And the argument has both `base`, `name` and `ext` => ' +
              'use `base` \n\tpreferentially',
        pathObj: {
          dir: 'path/to',
          base: 'fff',
          name: 'file',
          ext: '.txt',
        },
        expected: byPlatform({
          win32: 'path/to\\fff',
          otherwise: 'path/to/fff',
        }),
      },
    ],
  },
  {
    name: 'When argument\'s properties are illegal type',
    cases: [
      {
        name: 'And `pathObj` is ${testcase.pathObj} => ${testcase.expected}',
        pathObj: {
          dir: true,
          base: true,
        },
        expected: '',
      },
      {
        name: 'And `pathObj` is ${testcase.pathObj} => ${testcase.expected}',
        pathObj: {
          dir: false,
          base: false,
        },
        expected: '',
      },
      {
        name: 'And `pathObj` is ${testcase.pathObj} => ${testcase.expected}',
        pathObj: {
          dir: true,
          base: false,
        },
        expected: '',
      },
      {
        name: 'And `pathObj` is ${testcase.pathObj} => ${testcase.expected}',
        pathObj: {
          dir: false,
          base: true,
        },
        expected: '',
      },
      {
        name: 'And `pathObj` is ${testcase.pathObj} => ${testcase.expected}',
        pathObj: {
          dir: 1234,
          base: 98,
        },
        expected: '',
      },
      {
        name: 'And `pathObj` is ${testcase.pathObj} => ${testcase.expected}',
        pathObj: {
          dir: function aaa() {},
          base: function bbb() {},
        },
        expected: '',
      },
      {
        name: 'And `pathObj` is ${testcase.pathObj} => ${testcase.expected}',
        pathObj: {
          root: true,
          name: true,
          ext: true,
        },
        expected: '',
      },
      {
        name: 'And `pathObj` is ${testcase.pathObj} => ${testcase.expected}',
        pathObj: {
          root: true,
          name: false,
          ext: true,
        },
        expected: '',
      },
      {
        name: 'And `pathObj` is ${testcase.pathObj} => ${testcase.expected}',
        pathObj: {
          root: 123,
          name: 555,
          ext: 987,
        },
        expected: '',
      },
      {
        name: 'And `pathObj`\'s properties are functions',
        pathObj: {
          root: function aaa() {},
          name: function bbb() {},
          ext: function ccc() {},
        },
        expected: '',
      },
    ],
  },
  {
    name: 'When argument\'s properties are irregular values',
    cases: [
      {
        name: 'And `pathObj`\'s properties contains `/`',
        pathObj: {
          dir: '///aaa//bbb////ccc',
          name: 'ddd//eee',
          ext: '.fff',
        },
        expected: byPlatform({
          win32: '///aaa//bbb////ccc\\ddd//eee.fff',
          otherwise: '///aaa//bbb////ccc/ddd//eee.fff',
        }),
      },
      {
        name: 'And `pathObj`\'s properties contains `\\`',
        pathObj: {
          dir: '\\\\\\aaa\\\\bbb\\\\ccc',
          name: 'ddd\\\\eee',
          ext: '.fff',
        },
        expected: byPlatform({
          win32: '\\\\\\aaa\\\\bbb\\\\ccc\\ddd\\\\eee.fff',
          otherwise: '\\\\\\aaa\\\\bbb\\\\ccc/ddd\\\\eee.fff',
        }),
      },
    ],
  },
];

function testfn_path_format(testcase) {
  return path.format(testcase.pathObj);
}

function testfn_format(testcase) {
  return format(testcase.pathObj);
}

testrun('#format (path.format)', testfn_path_format, testcases);
testrun('#format (format)', testfn_format, testcases);
