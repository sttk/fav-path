'use strict';

var testrun = require('testrun').mocha;
var path = require('../');

function testfn(testcase) {
  if ('ext' in testcase) {
    return path.basename(testcase.path, testcase.ext);
  } else {
    return path.basename(testcase.path);
  }
}

testrun('#basename', testfn, [
  {
    name: 'When only path is an argument',
    cases: [
      {
        name: 'And argument type is not a string',
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
        name: 'And path is relative',
        cases: [
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: '.',
            expected: '.',
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: '',
            expected: '',
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: 'aaa',
            expected: 'aaa',
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: 'aaa/bbb',
            expected: 'bbb',
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: 'aaa/bbb/ccc',
            expected: 'ccc',
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: 'aaa/bbb/ccc.ddd',
            expected: 'ccc.ddd',
          },
        ],
      },
      {
        name: 'And path is absolute',
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
            expected: 'aaa',
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: '//aaa',
            expected: 'aaa',
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: '/aaa/bbb',
            expected: 'bbb',
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: '/aaa/bbb/ccc.d',
            expected: 'ccc.d',
          },
        ],
      },
      {
        name: 'And path ends with separators',
        cases: [
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: 'aaa/',
            expected: 'aaa',
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: 'aaa//',
            expected: 'aaa',
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: 'aaa/bbb/',
            expected: 'bbb',
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: 'aaa/bbb//',
            expected: 'bbb',
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: 'aaa/bbb/ccc.dddd/',
            expected: 'ccc.dddd',
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: 'aaa/bbb/ccc.dddd//',
            expected: 'ccc.dddd',
          },
        ],
      },
      {
        name: 'And path contains marks',
        cases: [
          {
            name: 'And the marks are not special for path',
            path: testrun.byPlatform({
              win32: '~`!@#$%^&*()-_=+[{]}|\'\"<,>.',
              otherwise: '~`!@#$%^&*()-_=+[{]}|\'\"<,>.:\\',
            }),
            expected: testrun.byPlatform({
              win32: '~`!@#$%^&*()-_=+[{]}|\'\"<,>.',
              otherwise: '~`!@#$%^&*()-_=+[{]}|\'\"<,>.:\\',
            }),
          },
          {
            name: 'And the marks are special for path',
            path: testrun.byPlatform({
              win32: '\\:;/',
              otherwise: '/;',
            }),
            expected: testrun.byPlatform({
              win32: ':;',
              otherwise: ';'
            }),
          },
        ],
      },
      {
        name: "And path separator is '\\' (for Windows)",
        cases: [
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: 'aaa\\bbb',
            expected: testrun.byPlatform({
              win32: 'bbb',
              otherwise: 'aaa\\bbb',
            }),
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: 'aaa\\bbb\\ccc',
            expected: testrun.byPlatform({
              win32: 'ccc',
              otherwise: 'aaa\\bbb\\ccc',
            }),
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: 'aaa\\bbb\\ccc.ddd',
            expected: testrun.byPlatform({
              win32: 'ccc.ddd',
              otherwise: 'aaa\\bbb\\ccc.ddd',
            }),
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: '\\',
            expected: testrun.byPlatform({
              win32: '\\',
              otherwise: '\\',
            }),
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: '\\\\',
            expected: testrun.byPlatform({
              win32: '\\',
              otherwise: '\\\\',
            }),
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: '\\aaa',
            expected: testrun.byPlatform({
              win32: 'aaa',
              otherwise: '\\aaa',
            }),
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: '\\\\aaa',
            expected: testrun.byPlatform({
              win32: 'aaa',
              otherwise: '\\\\aaa',
            }),
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: '\\aaa\\bbb',
            expected: testrun.byPlatform({
              win32: 'bbb',
              otherwise: '\\aaa\\bbb',
            }),
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: '\\aaa\\bbb\\ccc.d',
            expected: testrun.byPlatform({
              win32: 'ccc.d',
              otherwise: '\\aaa\\bbb\\ccc.d',
            }),
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: 'aaa\\',
            expected: testrun.byPlatform({
              win32: 'aaa',
              otherwise: 'aaa\\',
            }),
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: 'aaa\\bbb\\',
            expected: testrun.byPlatform({
              win32: 'bbb',
              otherwise: 'aaa\\bbb\\',
            }),
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: 'aaa\\bbb\\\\',
            expected: testrun.byPlatform({
              win32: 'bbb',
              otherwise: 'aaa\\bbb\\\\',
            }),
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: 'aaa\\bbb\\ccc.dddd',
            expected: testrun.byPlatform({
              win32: 'ccc.dddd',
              otherwise: 'aaa\\bbb\\ccc.dddd',
            }),
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: 'aaa\\bbb\\ccc.dddd\\\\',
            expected: testrun.byPlatform({
              win32: 'ccc.dddd',
              otherwise: 'aaa\\bbb\\ccc.dddd\\\\',
            }),
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: '//\\\\//\\\\',
            expected: testrun.byPlatform({
              win32: '\\',
              otherwise: '\\\\',
            }),
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: 'aaa\\//\\bbb',
            expected: testrun.byPlatform({
              win32: 'bbb',
              otherwise: '\\bbb',
            }),
          },
        ],
      },
    ],
  },
  {
    name: 'When path and ext are arguments',
    cases: [
      {
        name: 'And argument type is not a string',
        cases: [
          {
            name: 'And ext is ${testcase.ext} => ${testcase.error}',
            path: 'aaa',
            ext: null,
            error: TypeError,
          },
          {
            name: 'And ext is ${testcase.ext} => ${testcase.error}',
            path: 'aaa',
            ext: {},
            error: TypeError,
          },
          {
            name: 'And ext is ${testcase.ext} => ${testcase.error}',
            path: 'aaa',
            ext: 987,
            error: TypeError,
          },
        ],
      },
      {
        name: 'And ext is empty',
        cases: [
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: '',
            ext: '',
            expected: '',
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: '.',
            ext: '',
            expected: '.',
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: 'aaa',
            ext: '',
            expected: 'aaa',
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: 'aaa/bbb',
            ext: '',
            expected: 'bbb',
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: 'aaa/bbb.ccc',
            ext: '',
            expected: 'bbb.ccc',
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: '/aaa/bbb.ccc',
            ext: '',
            expected: 'bbb.ccc',
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: '/',
            ext: '',
            expected: '/',
          },
          {
            name: 'And path is ${testcase.path} => ${testcase.expected}',
            path: '//',
            ext: '',
            expected: '/',
          },
        ],
      },
      {
        name: 'And ext matches an end of file name',
        cases: [
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'aaa.bbb',
            ext: '.bbb',
            expected: 'aaa',
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'aaa.bbb',
            ext: 'bbb',
            expected: 'aaa.',
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'aaabbb',
            ext: 'bbb',
            expected: 'aaa',
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'aaa/bbb',
            ext: 'bb',
            expected: 'b',
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'aaa/bbb',
            ext: 'bbb',
            expected: 'bbb',
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'aaa/bbb',
            ext: 'a/bbb',
            expected: 'bbb',
          },
        ],
      },
      {
        name: 'And ext matches a file name',
        cases: [
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'aaa',
            ext: 'aaa',
            expected: 'aaa',
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'aaa/bbb',
            ext: 'aaa/bbb',
            expected: 'bbb',
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: '/aaa/bbb',
            ext: '/aaa/bbb',
            expected: 'bbb',
          },
        ],
      },
      {
        name: 'And ext does not matches a part of file name',
        cases: [
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'aaa',
            ext: 'bbb',
            expected: 'aaa',
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'aaa',
            ext: '/aaa',
            expected: 'aaa',
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'aaa',
            ext: '/a',
            expected: 'aaa',
          },
        ],
      },
      {
        name: 'And ext does not matches a part of file name',
        cases: [
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'abc',
            ext: 'ab',
            expected: 'abc',
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'aaa/bbb',
            ext: 'aaa/b',
            expected: 'bbb',
          },
        ],
      },
      {
        name: "And path separator is '\\' (for Windows)",
        cases: [
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'aaa\\bbb',
            ext: '',
            expected: testrun.byPlatform({
              win32: 'bbb',
              otherwise: 'aaa\\bbb',
            }),
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'aaa\\bbb.ccc',
            ext: '.ccc',
            expected: testrun.byPlatform({
              win32: 'bbb',
              otherwise: 'aaa\\bbb',
            }),
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: '\\aaa\\bbb.ccc',
            ext: '.ccc',
            expected: testrun.byPlatform({
              win32: 'bbb',
              otherwise: '\\aaa\\bbb',
            }),
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: '\\',
            ext: '',
            expected: testrun.byPlatform({
              win32: '\\',
              otherwise: '\\',
            }),
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: '\\\\',
            ext: '',
            expected: testrun.byPlatform({
              win32: '\\',
              otherwise: '\\\\',
            }),
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'aaa\\bbb',
            ext: 'bb',
            expected: testrun.byPlatform({
              win32: 'b',
              otherwise: 'aaa\\b',
            }),
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'aaa\\bbb',
            ext: 'bbb',
            expected: testrun.byPlatform({
              win32: 'bbb',
              otherwise: 'aaa\\',
            }),
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'aaa\\bbb',
            ext: 'a\\bbb',
            expected: testrun.byPlatform({
              win32: 'bbb',
              otherwise: 'aa',
            }),
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'aaa\\bbb',
            ext: 'aaa\\bbb',
            expected: testrun.byPlatform({
              win32: 'bbb',
              otherwise: 'aaa\\bbb',
            }),
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: '\\aaa\\bbb',
            ext: '\\aaa\\bbb',
            expected: testrun.byPlatform({
              win32: 'bbb',
              otherwise: '\\aaa\\bbb',
            }),
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'aaa\\bbb',
            ext: 'a\\b',
            expected: testrun.byPlatform({
              win32: 'bbb',
              otherwise: 'aaa\\bbb',
            }),
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'C:\\aaa',
            ext: '',
            expected: testrun.byPlatform({
              win32: 'aaa',
              otherwise: 'C:\\aaa',
            }),
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'C:\\aaa',
            ext: 'aa',
            expected: testrun.byPlatform({
              win32: 'a',
              otherwise: 'C:\\a',
            }),
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'C:\\aaa',
            ext: 'aaa',
            expected: testrun.byPlatform({
              win32: 'aaa',
              otherwise: 'C:\\',
            }),
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'C:\\aaa',
            ext: '\\aaa',
            expected: testrun.byPlatform({
              win32: 'aaa',
              otherwise: 'C:',
            }),
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'C:\\aaa',
            ext: ':\\aaa',
            expected: testrun.byPlatform({
              win32: 'aaa',
              otherwise: 'C',
            }),
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'C:\\aaa',
            ext: 'C:\\\aaa',
            expected: testrun.byPlatform({
              win32: 'aaa',
              otherwise: 'C:\\aaa',
            }),
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'C:aaa',
            ext: '',
            expected: testrun.byPlatform({
              win32: 'aaa',
              otherwise: 'C:aaa',
            }),
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'C:aaa',
            ext: 'aa',
            expected: testrun.byPlatform({
              win32: 'a',
              otherwise: 'C:a',
            }),
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'C:aaa',
            ext: 'aaa',
            expected: testrun.byPlatform({
              win32: 'aaa',
              otherwise: 'C:',
            }),
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'C:aaa',
            ext: ':aaa',
            expected: testrun.byPlatform({
              win32: 'aaa',
              otherwise: 'C',
            }),
          },
          {
            name: 'And path is ${testcase.path} and ext is ${testcase.ext} ' +
                  '=> ${testcase.expected}',
            path: 'C:aaa',
            ext: 'C:aaa',
            expected: testrun.byPlatform({
              win32: 'aaa',
              otherwise: 'C:aaa',
            }),
          },
        ],
      },
    ],
  },
]);
