'use strict';

var testrun = require('testrun').mocha;
var path = require('../');

function testfn(testcase) {
  return path.dirname(testcase.path);
}

testrun('#dirname', testfn, [
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
        path: {},
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.error}',
        path: 1234,
        error: TypeError,
      },
    ],
  },
  {
    name: 'When path is relative',
    cases: [
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '.',
        expected: '.',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '',
        expected: '.',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa',
        expected: '.',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa/bbb',
        expected: 'aaa',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa/bbb/ccc',
        expected: 'aaa/bbb',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa/bbb/ccc.ddd',
        expected: 'aaa/bbb',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: './aaa',
        expected: '.',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '../aaa',
        expected: '..',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '.../aaa',
        expected: '...',
      },
    ],
  },
  {
    name: 'When path is absolute',
    cases: [
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '/',
        expected: '/',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '//',
        expected: '/',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '/aaa',
        expected: '/',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '//aaa',
        expected: '/',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '/aaa/bbb',
        expected: '/aaa',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '/aaa/bbb/ccc.d',
        expected: '/aaa/bbb',
      },
    ],
  },
  {
    name: 'When path ends with separators',
    cases: [
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa/',
        expected: '.',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa//',
        expected: '.',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa/bbb/',
        expected: 'aaa',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa/bbb//',
        expected: 'aaa',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa/bbb/ccc.dddd/',
        expected: 'aaa/bbb',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa/bbb/ccc.dddd//',
        expected: 'aaa/bbb',
      },
    ],
  },
  {
    name: 'When path contains marks',
    cases: [
      {
        name: 'And the marks are not special for path',
        path: testrun.byPlatform({
          win32: '~`!@#$%^&*()-_=+[{]}|\'\"<,>.',
          otherwise: '~`!@#$%^&*()-_=+[{]}|\'\"<,>.:\\',
        }),
        expected: testrun.byPlatform({
          win32: '.',
          otherwise: '.',
        }),
      },
      {
        name: 'And the marks are special for path',
        path: testrun.byPlatform({
          win32: '\\:;/',
          otherwise: '/;',
        }),
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '/',
        }),
      },
    ],
  },
  {
    name: "When path separator is '\\' (for Windows)",
    cases: [
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa\\bbb',
        expected: testrun.byPlatform({
          win32: 'aaa',
          otherwise: '.',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa\\bbb\\ccc',
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb',
          otherwise: '.',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa\\bbb\\ccc.ddd',
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb',
          otherwise: '.',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '\\',
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '.',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '\\\\',
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '.',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '\\aaa',
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '.',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '\\\\aaa',
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '.',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '\\aaa\\bbb',
        expected: testrun.byPlatform({
          win32: '\\aaa',
          otherwise: '.',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '\\aaa\\bbb\\ccc.d',
        expected: testrun.byPlatform({
          win32: '\\aaa\\bbb',
          otherwise: '.',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa\\',
        expected: testrun.byPlatform({
          win32: '.',
          otherwise: '.',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa\\bbb\\',
        expected: testrun.byPlatform({
          win32: 'aaa',
          otherwise: '.',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa\\bbb\\\\',
        expected: testrun.byPlatform({
          win32: 'aaa',
          otherwise: '.',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa\\bbb\\ccc.dddd',
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb',
          otherwise: '.',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa\\bbb\\ccc.dddd\\\\',
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb',
          otherwise: '.',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '//\\\\//\\\\',
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '/\\\\',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '\\//\\\\//\\\\',
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '\\/\\\\',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa\\//\\bbb',
        expected: testrun.byPlatform({
          win32: 'aaa',
          otherwise: 'aaa\\',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa\\\\//\\bbb',
        expected: testrun.byPlatform({
          win32: 'aaa',
          otherwise: 'aaa\\\\',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '///\\\\//\\',
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '/\\\\',
        }),
      },
    ],
  },
]);
